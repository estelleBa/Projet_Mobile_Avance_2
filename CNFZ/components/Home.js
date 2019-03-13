import React from 'react';
import { StyleSheet, View, Text, ToucheableOpacity, Button } from 'react-native';
//import Forum from './Forum';
import { getCategories } from '../api/chucknorris'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  _displayCategories = () => {
    getCategories().then(data => {
      this.props.navigation.navigate("Categories", {categories: data})
    })
  }

  render() {
    return (
      <View>
        <Button title='Categories' onPress={() => this._displayCategories()}/>
      </View>
      // <View>
      //   <Forum test='test'/>
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 100,
    flexDirection: 'row'
  },
  content_container: {
    backgroundColor: 'pink'
  }
})
