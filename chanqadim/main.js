import React, { Component } from 'react'
import {Scene, Router} from 'react-native-router-flux';
import { observer } from "mobx-react/native"
import { Text } from 'react-native'

import CategoriesStore from "./CategoriesStore"
import CategoriesList from "./CategoriesList"
import BundlesList from "./BundlesList"
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
            <Scene initial={true} key="home" component={CategoriesList} title="Categories" store={CategoriesStore}/>
            <Scene key="bundles" component={BundlesList} title="Bundles" store={CategoriesStore}/>
            <Scene key="bundle" component={Bundle} title="Bundle" store={CategoriesStore}/>
          </Scene>
          <Scene icon={() => <Text>P</Text>} key="profile" title="Profile" component={Profile} store={CategoriesStore}/>
        </Scene>
        <Scene key="login" component={Login} title="Login" store={CategoriesStore} />
      </Scene>
    </Router>
  }
}