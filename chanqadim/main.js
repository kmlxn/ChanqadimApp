import React, { Component } from 'react'
import {Scene, Router} from 'react-native-router-flux';
import { observer } from "mobx-react/native"
import { Text, StyleSheet } from 'react-native'

import store from './store'
import Categories from './screens/Categories'
import Category from './screens/Category'
import Bundle from './screens/Bundle'
import Profile from './screens/Profile'
import EditProfile from './screens/EditProfile'
import Login from './screens/Login'
import Add from './screens/Add'


export default class Main extends Component {
  render() {
    return <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} sceneStyle={styles.routerScene}>
      <Scene key="root">
        <Scene tabs key="main" tabBarStyle={{backgroundColor: 'white', elevation: 8}}
          tabBarSelectedItemStyle={{borderTopWidth: 2, borderTopColor: '#ffea00'}}
        >
          <Scene icon={() => <Text>H</Text>} key="browse" title="Browse">
            <Scene initial={true} key="categories" component={Categories} title="Categories" store={store}/>
            <Scene key="category" component={Category} title="Category" store={store}/>
            <Scene key="bundle" component={Bundle} title="Bundle" store={store}/>
          </Scene>
          <Scene icon={() => <Text>P</Text>} key="profile_stuff" title="Profile Stuff">
              <Scene key="profile" title="Profile" component={Profile} store={store}/>
              <Scene key="editProfile" title="Edit Profile" component={EditProfile} store={store}/>
          </Scene>
          <Scene icon={() => <Text>A</Text>} key="add" title="Add" component={Add} store={store}/>
        </Scene>
        <Scene key="login" component={Login} title="Login" store={store} />
      </Scene>
    </Router>
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#b2ebf2',
    borderBottomColor: '#b2ebf2',
    elevation: 2,
  },
  navTitle: {
    color: 'white',
  },
  routerScene: {
    // paddingTop: 200, // some navbar padding to avoid content overlap
  },
})