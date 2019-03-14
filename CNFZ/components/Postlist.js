import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export default class PostList extends React.Component {
  render() {
    const post = this.props.post
    return (
      <View style={styles.post_container}>
        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>{post}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  post_container: {
    flex:1,
    margin: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151515'
  },
})
