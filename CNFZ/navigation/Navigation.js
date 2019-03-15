import { createStackNavigator, createAppContainer } from 'react-navigation'
import Home from '../components/Home'
import Forum from '../components/Forum'
import Categories from '../components/Categories'
import Search from '../components/Search'
import AccelerometerSensor from '../components/accelerometer'

const SearchStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Chuck Norris FAN ZONE'
    }
  },
  Forum: {
    screen: Forum
  },
  Categories: {
    screen: Categories
  },
  Search: {
    screen: Search
  },
  AccelerometerSensor: {
    screen: AccelerometerSensor
  }
})

export default createAppContainer(SearchStackNavigator)
