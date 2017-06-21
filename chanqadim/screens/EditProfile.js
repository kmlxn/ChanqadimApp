import React, { Component } from 'react'
import { observer } from 'mobx-react/native'
import { View, Text, StyleSheet, Image,
  TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import openImage from '../imagePicker'
import theme from '../theme'

@observer
export default class EditProfile extends Component {
  componentWillMount () {
    this.setState({
      image: this.props.user && this.props.user.image
    })
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      image: newProps.user && newProps.user.image
    })
  }

  render () {
    let image

    if (this.state.image) {
      if (this.state.image.uri) {
        image = <Image source={this.state.image} style={{width: 80, height: 80}} />
      } else {
        image = <Image source={{uri: this.state.image}} style={{width: 80, height: 80}} />
      }
    } else {
      image = <Text>Image</Text>
    }

    return <View style={styles.container}>
      {this.state.isSpinnerDisplayed && <ActivityIndicator />}
      {this.state.isValidationErrorDisplayed && <Text>Invalid input</Text>}

      <TouchableOpacity onPress={() => this.onImageClick()}>
        {image}
      </TouchableOpacity>

      <Text>Old password</Text>
      <TextInput secureTextEntry onChangeText={password => this.setState({password})} />
      <Text>New password</Text>
      <TextInput secureTextEntry onChangeText={newPassword => this.setState({newPassword})} />
      <Text>Repeat new password</Text>
      <TextInput secureTextEntry onChangeText={newPasswordRepeated => this.setState({newPasswordRepeated})} />

      <TouchableOpacity disabled={this.state.isSubmitButtonDisabled} onPress={() => this.onSubmit()}>
        <Icon name='save' size={30} color={theme.accentColor} />
      </TouchableOpacity>
    </View>
  }

  areInputsValid () {
    return this.state.password !== '' && this.state.password !== undefined &&
      this.state.newPassword === this.state.newPasswordRepeated
  }

  async onSubmit () {
    this.disableSubmitButton()

    if (this.areInputsValid()) {
      this.displaySpinner()

      const status = await this.save()

      this.hideSpinner()

      if (status === 'wrong password') { this.displayValidationError() }
    } else {
      this.displayValidationError()
    }

    this.enableSubmitButton()
  }

  async save () {
    let data = {}

    if (this.state.image) { data.image = {...this.state.image} }
    if (this.state.password) { data.password = this.state.password }
    if (this.state.newPassword) { data.newPassword = this.state.newPassword }

    data.username = 'kmlxn'

    return await this.props.mobxStore.uploadUserInfo(data)
  }

  displaySpinner () {
    this.setState({isSpinnerDisplayed: true})
  }

  hideSpinner () {
    this.setState({isSpinnerDisplayed: false})
  }

  displayValidationError () {
    this.setState({isValidationErrorDisplayed: true})
  }

  disableSubmitButton () {
    this.setState({isSubmitButtonDisabled: true})
  }

  enableSubmitButton () {
    this.setState({isSubmitButtonDisabled: false})
  }

  async onImageClick () {
    const image = await openImage()
    this.setState({image})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 55
  },
  bundle: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    flex: 1,
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  switch: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 20
  }
})
