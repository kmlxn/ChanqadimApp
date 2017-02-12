import React, { Component } from "react"
import { observer } from "mobx-react/native"
import { View, Text, StyleSheet, Image, Dimensions,
  TouchableOpacity, TextInput, Picker, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import openImage from '../imagePicker'

@observer
export default class EditProfile extends Component {
  componentWillMount() {
    this.setState({
      image: this.props.user && this.props.user.image,
    })
  }
  
  componentWillReceiveProps(newProps) {
    this.setState({
      image: newProps.user && newProps.user.image,
    })
  }
  
  render() {
    const image = this.state.image
    
    return <View style={styles.container}>
      {this.state.isSpinnerDisplayed && <ActivityIndicator/>}
      {this.state.isValidationErrorDisplayed && <Text>Invalid input</Text>}

      <TouchableOpacity onPress={() => this.onImageClick()}>
        {image ?
          <Image source={image} style={{width: 80, height: 80}}/>
          : <Text>Image</Text>
        }
      </TouchableOpacity>

      <Text>Old password</Text>
      <TextInput secureTextEntry onChangeText={password => this.setState({password})}/>
      <Text>New password</Text>
      <TextInput secureTextEntry onChangeText={newPassword => this.setState({newPassword})}/>
      <Text>Repeat new password</Text>
      <TextInput secureTextEntry onChangeText={newPasswordRepeated => this.setState({newPasswordRepeated})}/>

      <TouchableOpacity disabled={this.state.isSubmitButtonDisabled} onPress={() => this.onSubmit()}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  }

  areInputsValid() {
    return this.state.password !== '' && this.state.password !== undefined
      && this.state.newPassword === this.state.newPasswordRepeated
  }

  async onSubmit() {
    this.disableSubmitButton()
    
    if (this.areInputsValid()) {
      this.displaySpinner()
  
      const status = await this.save()
      
      this.hideSpinner()

      if (status === 'wrong password')
        this.displayValidationError()
    } else {
      this.displayValidationError()
    }

    this.enableSubmitButton()
  }

  async save() {
    return await this.props.store.uploadUserInfo({
      password: this.state.password,
      newPassword: this.state.newPassword,
    })
  }
  
  displaySpinner() {
    this.setState({isSpinnerDisplayed: true})
  }
  
  hideSpinner() {
    this.setState({isSpinnerDisplayed: false})
  }
  
  displayValidationError() {
    this.setState({isValidationErrorDisplayed: true})
  }
  
  disableSubmitButton() {
    this.setState({isSubmitButtonDisabled: true})
  }
  
  enableSubmitButton() {
    this.setState({isSubmitButtonDisabled: false})
  }
  
  async onImageClick() {
    const image = await openImage()
    this.setState({image})
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 55,
  },
  bundle: {
    flexDirection: 'row',
    alignSelf: "stretch",
    flex: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  switch: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 20,
  },
})