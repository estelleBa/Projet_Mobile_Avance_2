import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList, Button, ActivityIndicator } from "react-native";
import { getRandomJoke } from "../api/chucknorris";

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = { joke: [], isLoading: false }
  }

  _askForJoke() {
    this.setState({
      joke: []
    }, () => {
      this._getJoke()
    })
  }

  _getJoke() {
      this.setState({ isLoading: true })
      getRandomJoke().then(data => {console.log(data)
        this.setState({ joke: data.value, isLoading: false })
      })
  }

  _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
    }

  render() {console.log(this.state)
    return (
      <View style={styles.container}>
        <Button title='Ask For Joke' onPress={() => this._askForJoke()}/>
        <Text>{this.state.joke}</Text>
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    backgroundColor: '#fff',
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
