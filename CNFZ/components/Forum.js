import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import { getPosts, getPostsCount } from '../api/chucknorris'
import PostList from './Postlist'

export default class Forum extends React.Component {

  constructor(props) {
    super(props)
    this.text = ''
    this.state = { count: 0, posts: [], isLoading: false }
  }

  _searchTextInputChanged(text) {
    this.text = text
  }

  _post() {
    const url = 'http://b7063c3e.ngrok.io/posts/add'
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: this.text
      }),
    });
  }

  _get() {
    getPosts().then(data => {
      console.log(data)
      this.setState({ posts: data.posts })
    })
  }

  _getCount() {
    getPostsCount(this.state.count).then(data => {
      this.setState({ count: data.count })
      if(data.update == true){
        this._get()
      }
      console.log('OOOOOOOOOO'+this.state.count)
      console.log(data)
    })
  }

  render() {
    return (
      <View>
        { this._getCount() }
        <View>
          <TextInput style={styles.input} placeholder='...'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._post()}/>
        </View>
        <ScrollView>
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => <PostList post={item.content}/>}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 100,
    flexDirection: 'row'
  },
  input: {
    backgroundColor: 'pink'
  }
})
