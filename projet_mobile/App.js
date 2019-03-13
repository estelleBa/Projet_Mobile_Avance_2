import React, { Component } from "react";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import Home from "./components/home";
//
// export default class App extends Component {
//   render() {
//     return <Home />;
//   }
// }
// import React, { Component } from "react";
// import {createStackNavigator, createAppContainer} from 'react-navigation';
//
// const MainNavigator = createStackNavigator({
//   Home: {screen: Home}
// });
//
// const App = createAppContainer(MainNavigator);
//
// export default App;

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AuthenticationNavigator = createStackNavigator({
  Home: Home
});

const AppNavigator = createSwitchNavigator({
  /*
   * Rather than being rendered by a screen component, the
   * AuthenticationNavigator is a screen component
  */
  Home: Home
});

const AppContainer = createAppContainer(AppNavigator);
