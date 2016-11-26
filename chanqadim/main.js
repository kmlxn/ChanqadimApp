import React, { Component } from 'react'
import {Scene, Router} from 'react-native-router-flux';
import { observer } from "mobx-react/native"
import { Text } from 'react-native'

import Store from "./Store"
import Categories from "./Categories"
import Category from "./Category"
import Bundle from "./Bundle"
import Profile from "./Profile"

import Login from './Login'

export default class Main extends Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene tabs key="main" tabBarStyle={{backgroundColor: 'skyblue'}}
          tabBarSelectedItemStyle={{backgroundColor: 'red'}}
        >
          <Scene icon={() => <Text>H</Text>} key="browse" title="Browse">
            <Scene initial={true} key="categories" component={Categories} title="Categories" store={Store}/>
            <Scene key="category" component={Category} title="Category" store={Store}/>
            <Scene key="bundle" component={Bundle} title="Bundle" store={Store}/>
          </Scene>
          <Scene icon={() => <Text>P</Text>} key="profile" title="Profile" component={Profile} store={Store}/>
        </Scene>
        <Scene key="login" component={Login} title="Login" store={Store} />
      </Scene>
    </Router>
  }
}