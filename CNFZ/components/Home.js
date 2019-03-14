import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, ActivityIndicator, ScrollView } from 'react-native';
import { getRandomJoke } from '../api/chucknorris'
import { getCategories } from '../api/chucknorris'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { joke: "", isLoading: false }
  }

  _displayRandomJoke() {
    this.setState({ joke: ""})
    this.setState({ isLoading: true })
    getRandomJoke().then(data => {
      this.setState({ joke: data.value, isLoading: false })
    })
  }

  _displayCategories = () => {
    getCategories().then(data => {
      this.props.navigation.navigate("Categories", {categories: data})
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

  render() {
    return (
      <View style={styles.main_container}>
        <ScrollView style={{flex:1}}>
          <View style={styles.joke_container}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>''{this.state.joke}''</Text>
          </View>
        </ScrollView>
        <View style={styles.menu_container}>
          <TouchableOpacity style = {{alignItems: 'center', justifyContent: 'center', margin:10, marginTop:0, flex: 1,backgroundColor: '#151515'}}
          onPress={() => this.props.navigation.navigate('Forum')}>
            <View>
              <Text style = {{ color: '#fff', fontSize: 15 }}>FORUM</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style = {{alignItems: 'center', justifyContent: 'center', margin:10, marginTop:0, flex: 1,backgroundColor: '#46FEA7'}}
          onPress={() => this._displayCategories()}>
            <View>
              <Text style = {{ fontSize: 15 }}>CATEGORIES</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style = {{alignItems: 'center', justifyContent: 'center', margin:10, marginTop:0, flex: 1,backgroundColor: '#46F9FE'}}
          onPress={() => this.props.navigation.navigate('Search')}>
            <View>
              <Text style = {{ fontSize: 15 }}>SEARCH JOKE</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style = {{alignItems: 'center', justifyContent: 'center', margin:10, marginTop:0, flex: 1,backgroundColor: '#469DFE'}}
          onPress={() => this._displayRandomJoke()}>
            <View>
              <Text style = {{ fontSize: 15 }}>GET RANDOM JOKE</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
    justifyContent: 'space-between'
  },
  joke_container: {
    flex:1,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menu_container: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
