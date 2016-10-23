import React, { Component } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

export default class Login extends Component {
  constructor() {
    super()
    this.state = {}
  }
  login() {
    this.props.store.login('kmlxn', '***REMOVED***')
  }
  onChangeUsername(username) {
    this.setState({username})
  }
  onChangePassword(password) {
    this.setState({password})
  }
  render() {
    return <View style={{marginTop: 60}}>
      <TextInput onChangeText={this.onChangeUsername.bind(this)}/>
      <TextInput secureTextEntry onChangeText={this.onChangePassword.bind(this)}/>
      <TouchableOpacity onPress={() => this.login()} style={{backgroundColor: 'red', borderRadius: 10, padding: 10, margin: 10}}>
        <Text>login</Text>
      </TouchableOpacity>
    </View>
  }
}