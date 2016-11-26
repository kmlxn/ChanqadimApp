import React, { Component } from 'react'
import {Scene, Router} from 'react-native-router-flux';
import { observer } from "mobx-react/native"
import { Text } from 'react-native'

import CategoriesStore from "./CategoriesStore"
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
            <Scene initial={true} key="categories" component={Categories} title="Categories" store={CategoriesStore}/>
            <Scene key="category" component={Category} title="Category" store={CategoriesStore}/>
            <Scene key="bundle" component={Bundle} title="Bundle" store={CategoriesStore}/>
          </Scene>
          <Scene icon={() => <Text>P</Text>} key="profile" title="Profile" component={Profile} store={CategoriesStore}/>
        </Scene>
        <Scene key="login" component={Login} title="Login" store={CategoriesStore} />
      </Scene>
    </Router>
  }
}