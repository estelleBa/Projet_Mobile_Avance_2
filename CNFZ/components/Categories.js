import React from 'react';
import { StyleSheet, View, ScrollView, Text, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getRandomJokeWithCategory } from '../api/chucknorris'

export default class Categories extends React.Component {

  constructor(props) {
    super(props)
    this.state = { joke: "" }
  }

  _enterCategory(category) {
    this.setState({ joke: ""})
    getRandomJokeWithCategory(category).then(data => {
      this.setState({ joke: data.value })
    })
  }

  render() {
    const { navigation } = this.props;
    const categories = navigation.getParam('categories');

    return (
      <ScrollView style={styles.main_container}>
        <View style={styles.joke_container}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>''{this.state.joke}''</Text>
        </View>
        <View style={styles.boxes_container}>
        { categories.map((category, i) =>
          <View key={category}>
            <TouchableOpacity style={styles.buttons} onPress={() => this._enterCategory(category)}>
              <Text style = {{ color: '#fff', fontSize: 17 }}>{category}</Text>
            </TouchableOpacity>
          </View>
        )}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  joke_container: {
    flex:1,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxes_container: {
    flex:1,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttons: {
    alignItems: 'center',
    backgroundColor: '#151515',
    padding: 10,
    margin: 5
  }
})
