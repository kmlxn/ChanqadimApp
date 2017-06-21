import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Scenes } from './router'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router } from 'react-native-router-flux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import theme from './theme'

import reducers from './reducers'

const middleware = __DEV__ ? [thunkMiddleware, loggerMiddleware] : [thunkMiddleware]
let store = createStore(reducers, applyMiddleware(...middleware))
const ConnectedRouter = connect()(Router)

export default class Main extends Component {
  render () {
    return <Provider store={store}>
      <ConnectedRouter navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} scenes={Scenes} />
    </Provider>
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: theme.mainColor,
    borderBottomWidth: 0,
    elevation: 2
  },
  navTitle: {
    color: 'white'
  }
})
