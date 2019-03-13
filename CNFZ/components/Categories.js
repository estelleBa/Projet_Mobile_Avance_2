import React from 'react';
import { StyleSheet, View, Text, Button, ToucheableOpacity } from 'react-native';
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
      <View>
        <Text>{this.state.joke}</Text>
         { categories.map((category, i) =>
            <View key={category}>
              <Button style={styles.buttons} title={category} onPress={() => this._enterCategory(category)}/>
            </View>
         )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 100,
    flexDirection: 'row'
  },
  buttons: {
    color: 'pink'
  }
})
