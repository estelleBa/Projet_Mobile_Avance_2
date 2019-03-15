import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export default class PostList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const post = this.props.post
    return (
      <View style={styles.post_container}>
        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 17 }}>{post.content}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  post_container: {
    flex:1,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#2FA5D5'
  },
  post_loc: {
    flex:1,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10
  }
})
