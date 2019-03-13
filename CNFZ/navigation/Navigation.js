import { createStackNavigator, createAppContainer } from 'react-navigation'
import Home from '../components/Home'
import Forum from '../components/Forum'
import Categories from '../components/Categories'

const SearchStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home'
    }
  },
  Forum: {
    screen: Forum
  },
  Categories: {
    screen: Categories
  }
})

export default createAppContainer(SearchStackNavigator)
