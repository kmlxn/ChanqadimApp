import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'

import reducers, { getSignInStatus, getBootingUpStatus } from './reducers'
import { retrieveAuthToken } from './actions'
import Login from './screens/Login'
import Router from './router'
import Loading from './blocks/Loading'

const middleware = __DEV__ ? [thunkMiddleware, loggerMiddleware] : [thunkMiddleware]
let store = createStore(reducers, applyMiddleware(...middleware))

class Switch extends Component {
  componentDidMount () {
    this.props.onDidMount()
  }

  render () {
    if (this.props.isBootingUp) {
      return <Loading />
    }
    return this.props.isSignedIn ? <Router /> : <Login />
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onDidMount () {
      dispatch(retrieveAuthToken())
    }
  }
}

function mapStateToProps (state) {
  return {
    isSignedIn: getSignInStatus(state),
    isBootingUp: getBootingUpStatus(state)
  }
}

const ConnectedSwitch = connect(mapStateToProps, mapDispatchToProps)(Switch)

export default class Main extends Component {
  render () {
    return <Provider store={store}>
      <ConnectedSwitch />
    </Provider>
  }
}
