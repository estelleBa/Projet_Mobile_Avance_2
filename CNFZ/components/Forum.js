import React from 'react';
import { StyleSheet, View, Text, ToucheableOpacity } from 'react-native';

export default class Forum extends React.Component {
  render() {
    return (
      <Text>{this.props.test}</Text>
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
