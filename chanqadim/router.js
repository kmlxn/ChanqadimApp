import React from 'react'
import { Scene, Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

import store from './store'
import Categories from './screens/Categories'
import Category from './screens/Category'
import Bundle from './screens/Bundle'
import Profile from './screens/Profile'
import EditProfile from './screens/EditProfile'
import Login from './screens/Login'
import Add from './screens/Add'
import theme from './theme'

export const Scenes = Actions.create(
  <Scene key='root'>
    <Scene tabs key='main' tabBarStyle={{backgroundColor: 'white', elevation: 8}}
      tabBarSelectedItemStyle={{borderTopWidth: 2, borderTopColor: theme.accentColor}}
      >
      <Scene icon={() => <Icon name='home' size={30} color='black' />} key='browse' title='Browse'>
        <Scene initial key='categories' component={Categories} title='Categories' mobxStore={store} />
        <Scene key='category' component={Category} title='Category' mobxStore={store} />
        <Scene key='bundle' component={Bundle} title='Bundle' mobxStore={store} />
      </Scene>
      <Scene icon={() => <Icon name='user' size={30} color='black' />} key='profile_stuff' title='Profile Stuff'>
        <Scene key='profile' title='Profile' component={Profile} mobxStore={store} />
        <Scene key='editProfile' title='Edit Profile' component={EditProfile} mobxStore={store} />
      </Scene>
      <Scene icon={() => <Icon name='plus' size={30} color='black' />} key='add' title='Add' component={Add} mobxStore={store} />
    </Scene>
    <Scene key='login' component={Login} title='Login' mobxStore={store} />
  </Scene>
)
