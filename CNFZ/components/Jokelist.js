import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export default class JokeList extends React.Component {
  render() {
    const joke = this.props.joke
    return (
      <View style={styles.joke_container}>
        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>''{joke}''</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  joke_container: {
    flex:1,
    margin: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151515'
  },
})
