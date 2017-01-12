import React, { Component } from "react"
import { observer } from "mobx-react/native"
import { View, Text, StyleSheet, Image, Dimensions,
  TouchableOpacity, TextInput, Picker, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker'


@observer
export default class EditProfile extends Component {
  render() {
    const username = this.state.username || this.props.user.username
    const image = this.state.image || this.props.user.image

    return <View>
      <ActivityIndicator animating={this.state.isSpinnerDisplayed}/>
      {this.state.isValidationErrorDisplayed && <Text>Invalid input</Text>}

      <TouchableOpacity onPress={() => this.openImage()}>
        {image ?
          <Image source={image} style={{width: 80, height: 80}}/>
          : <Text>Image</Text>
        }
      </TouchableOpacity>

      <Text>Username</Text>
      <TextInput defaultValue={username} onChangeText={username => this.setState({username})}/>
      <Text>Current password</Text>
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
    return this.state.username !== '' && this.state.username !== undefined
      && this.state.password !== '' && this.state.password !== undefined
      && this.state.newPassword === this.state.newPasswordRepeated
  }

  async onSubmit() {
    this.setState({isSubmitButtonDisabled: true})

    if (this.areInputsValid()) {
      this.setState({isSpinnerDisplayed: true})
      const status = await this.save()

      if (status === 'wrong password')
        this.setState({isValidationErrorDisplayed: true})

      this.setState({isSpinnerDisplayed: false})
    } else {
      this.setState({isValidationErrorDisplayed: true})
    }

    this.setState({isSubmitButtonDisabled: false})
  }

  async save() {
    return await this.props.store.uploadUserInfo({
      username: this.state.username,
      password: this.state.password,
      newPassword: this.state.newPassword,
    })
  }

  openImage() {
    const options = {
      title: 'Select Image',
      storageOptions: {
        name: '',
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        this.setState({
          image: {uri: response.uri, isStatic: true, name: 'image.jpg', type: 'image/jpg'},
        });
      }
    });
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
  }
})