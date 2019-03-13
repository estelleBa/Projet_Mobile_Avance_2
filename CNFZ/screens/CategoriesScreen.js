import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ToucheableOpacity, FlatList  } from 'react-native';
import { getCategories } from "../api/chucknorris";
import Categories from '../components/Categories';

export default class CategoriesScreen extends Component {
  static navigationOptions = {
    title: null,
  };

  constructor(props) {
    super(props)
    this.state = { categories: [] }
  }

  _askForCategories() {
    this.setState({
      categories: []
    }, () => {
      this._getCategories()
    })
  }

  _getCategories() {
    getCategories().then(data => {console.log(data)
      this.setState({ categories: data })
    })
  }

  render() {console.log(this.props)
    return (
      <View style={styles.container}>
        <Text>toto</Text>
        //{this._askForCategories()}
        <FlatList
          data={this.state.categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <Categories category={item} enterCategory={this._enterCategory} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
