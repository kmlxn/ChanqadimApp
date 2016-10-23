import React, { Component } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

export default class Login extends Component {
  login() {
    this.props.store.isLogged = true;
  }
  render() {
    return <View style={{marginTop: 40}}>
      <Text>Login</Text>
      <TouchableOpacity onPress={() => this.login()}><Text>login</Text></TouchableOpacity>
    </View>
  }
}