import React from 'react';
import { Constants, SQLite } from 'expo';
import Search from './Components/Search'

const db = SQLite.openDatabase('racing_society.db');

export default class App extends React.Component {
  render() {
    return (
      // <View style={styles.container}>
      //   <Text>RACING SOCIETY</Text>
      // </View>
      <Search/>
    );
  }
}
