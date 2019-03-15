import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, Platform } from 'react-native';
import { getPosts, getPostsCount, getLoc } from '../api/chucknorris'
import { Constants, Location, Permissions } from 'expo';
import PostList from './Postlist'
import Map from './map'

export default class Forum extends React.Component {

  constructor(props) {
    super(props)
    this.text = ''
    this.loc = []
    this.coords = []
    this.count = 0
    this.state = { count: 0, posts: [], isLoading: false, location: null, errorMessage: null, lastLoc: [] }
  }

  // _componentWillMount() {
  //   getLoc().then(data => {
  //     this.setState({ lastLoc: data.loc })
  //     this.coords = {long: this.state.lastLoc[0].longitude, lat: this.state.lastLoc[0].latitude}
  //   })
  // }

  // _position() {
  //   if (Platform.OS === 'android' && !Constants.isDevice) {
  //     this.setState({
  //       errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
  //     });
  //   } else {
  //     this._getLocationAsync();
  //   }
  // }

  // _getLocationAsync = async () => {
  //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //     if (status !== 'granted') {
  //       this.setState({
  //         errorMessage: 'Permission to access location was denied',
  //       });
  //     }
  //
  //     let location = await Location.getCurrentPositionAsync({});
  //     this.setState({ location });
  //     this._postLoc();
  // };

  // _postLoc() {
  //   if(this.state.location) {
  //     this.loc = this.state.location.coords;
  //     const url = 'http://bde66ef7.ngrok.io/loc'
  //     fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         loc: this.loc
  //       }),
  //     });
  //   }
  // }

  _searchTextInputChanged(text) {
    this.text = text
  }

  _post() {
    if(this.text != ''){
      const url = 'http://bde66ef7.ngrok.io/posts/add'
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
  }

  _get() {
    getPosts().then(data => {
      this.setState({ posts: data.posts })
    })
  }

  _getCount() {
    getPostsCount(this.state.count).then(data => {
      this.count= data.count
      if(data.update == true){
        this._get()
      }
    })
  }

  render() {

    return (
      <View style={styles.main_container}>
        { this._getCount() }
        <Map coords={this.coords} />
        <View style={styles.chat_container}>
          <ScrollView>
            <FlatList
              data={this.state.posts}
              keyExtractor={(item) => item._id}
              renderItem={({item}) => <PostList post={item}/>}
            />
          </ScrollView>
        </View>
        <View style={styles.inputs_container}>
          <View style={styles.input_container}>
            <TextInput style={styles.input} placeholder=''
            onChangeText={(text) => this._searchTextInputChanged(text)}
            onSubmitEditing={() => this._post()}/>
          </View>
          <View>
            <TouchableOpacity>
              <View>
                <Text>STREET FIGHT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  chat_container: {
    flex: 4
  },
  inputs_container: {
    flex: 1,
    backgroundColor: '#151515'
  },
  input_container: {
    marginTop: 10,
    margin: 10,
    borderColor: "#151515",
    borderWidth: 0.5
  },
  input: {
    backgroundColor: '#fff',
    margin: 5,
    padding: 5,
  }
})
