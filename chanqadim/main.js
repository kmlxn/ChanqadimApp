import React, { Component } from 'react'
import {Scene, Router} from 'react-native-router-flux';
import { observer } from "mobx-react/native"

import CategoriesStore from "./CategoriesStore"
import CategoriesList from "./CategoriesList"

import Login from './Login'

export default class Main extends Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene key="login" component={Login} title="Login" store={CategoriesStore} />
        <Scene initial={true} key="home" component={CategoriesList} title="Categories" store={CategoriesStore}/>
      </Scene>
    </Router>
  }
}