import React, { Component } from 'react'
import {Scene, Router} from 'react-native-router-flux';
import { observer } from "mobx-react/native"
import { Text } from 'react-native'

import store from './store'
import Categories from './screens/Categories'
import Category from './screens/Category'
import Bundle from './screens/Bundle'
import Profile from './screens/Profile'
import Login from './screens/Login'


export default class Main extends Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene tabs key="main" tabBarStyle={{backgroundColor: 'skyblue'}}
          tabBarSelectedItemStyle={{backgroundColor: 'red'}}
        >
          <Scene icon={() => <Text>H</Text>} key="browse" title="Browse">
            <Scene initial={true} key="categories" component={Categories} title="Categories" store={store}/>
            <Scene key="category" component={Category} title="Category" store={store}/>
            <Scene key="bundle" component={Bundle} title="Bundle" store={store}/>
          </Scene>
          <Scene icon={() => <Text>P</Text>} key="profile" title="Profile" component={Profile} store={store}/>
        </Scene>
        <Scene key="login" component={Login} title="Login" store={store} />
      </Scene>
    </Router>
  }
}