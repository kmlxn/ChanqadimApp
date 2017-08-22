import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { isSceneLoading, hasErrorHappened } from '../reducers'
import { login } from '../actions'
import InvalidInput from '../blocks/InvalidInput'

class Login extends Component {
  constructor () {
    super()
    this.state = {}
  }
  // login () {
  //   this.props.mobxStore.login('kmlxn', 'qaz')
  // }
  onChangeUsername (username) {
    this.setState({ username })
  }
  onChangePassword (password) {
    this.setState({ password })
  }
  onSubmit () {
    this.props.onSignInAttempt(this.state.username, this.state.password)
  }
  render () {
    const spinner = this.props.isSigningIn
      ? <View style={{marginTop: 60}}>
        <ActivityIndicator />
      </View>
      : undefined
    const error = this.props.serverError ? <InvalidInput /> : undefined

    return <View style={{marginTop: 60}}>
      <TextInput onChangeText={username => this.onChangeUsername(username)} />
      <TextInput secureTextEntry onChangeText={password => this.onChangePassword(password)} />
      <TouchableOpacity onPress={() => this.onSubmit()}
        style={{backgroundColor: 'red', borderRadius: 10, padding: 10, margin: 10}}
      >
        <Text>Sign In</Text>
      </TouchableOpacity>
      {spinner}
      {error}
    </View>
  }
}

function mapStateToProps (state) {
  return {
    isSigningIn: isSceneLoading(state, 'login'),
    serverError: hasErrorHappened(state, 'login')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSignInAttempt (username, password) {
      dispatch(login(username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
