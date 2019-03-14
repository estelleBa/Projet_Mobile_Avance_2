import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { getRandomJokeWithText } from '../api/chucknorris'
import JokeList from './Jokelist'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = ""
    this.state = { jokes: [], currentJoke: '', isLoading: false }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _displayRandomJokeWithText() {
    this.setState({ jokes: []})
    if(this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getRandomJokeWithText(this.searchedText).then(data => {
        this.setState({ jokes: data.result, isLoading: false })
      })
    }
  }

  _displayLoading() {
      if(this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
    }

  render() {
    return (
      <ScrollView style={styles.main_container}>
        <View style = {styles.input_container}>
          <TextInput style={styles.input} placeholder='search'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._displayRandomJokeWithText()}/>
        </View>
          <TouchableOpacity style={styles.button_container} onPress={() => this._displayRandomJokeWithText()}>
            <Text style = {{ textAlign: 'center', color: '#fff' }}>Search</Text>
          </TouchableOpacity>
        <FlatList
          data={this.state.jokes}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <JokeList joke={item.value}/>}
        />
        {this._displayLoading()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  input_container: {
    marginTop: 10,
    margin: 10,
    borderColor: "#151515",
    borderWidth: 0.5
  },
  input: {
    padding: 10,
  },
  button_container: {
    margin: 10,
    marginTop: 0,
    padding: 10,
    backgroundColor: '#151515'
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 200,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
