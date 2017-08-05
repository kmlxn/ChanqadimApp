import React, { Component } from 'react'
import { View, Text, StyleSheet, Image,
  TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

import { updateCurrentUser } from '../actions'
import { getCurrentUser, wasUpdateSuccessful, isSceneLoading } from '../reducers'
import openImage from '../imagePicker'
import theme from '../theme'
import InvalidInput from '../blocks/InvalidInput'
import UpdateSuccessful from '../blocks/UpdateSuccessful'
import Loading from '../blocks/Loading'

class EditProfile extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    const imageUri = this.state.image || this.props.user.image
    const picture = imageUri
      ? <Image source={{uri: imageUri}} style={styles.avatar} />
      : <Text>Image</Text>

    return <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer} onPress={() => this.onImageClick()}>
        {picture}
      </TouchableOpacity>

      <TextInput
        placeholder='Old password'
        underlineColorAndroid={theme.textInputBottomColor}
        secureTextEntry
        onChangeText={password => this.setState({password})}
      />
      <TextInput
        placeholder='New password'
        underlineColorAndroid={theme.textInputBottomColor}
        secureTextEntry
        onChangeText={newPassword => this.setState({newPassword})}
      />
      <TextInput
        placeholder='Repeat new password'
        underlineColorAndroid={theme.textInputBottomColor}
        secureTextEntry
        onChangeText={newPasswordRepeated => this.setState({newPasswordRepeated})}
      />

      {this.props.isLoading && <Loading />}
      {this.state.isValidationErrorDisplayed && <InvalidInput />}
      {this.props.wasUpdateSuccessful && <UpdateSuccessful />}

      <TouchableOpacity style={styles.fab} disabled={this.state.isSubmitButtonDisabled} onPress={() => this.onSubmit()}>
        <Icon name='save' size={30} color='white' />
      </TouchableOpacity>
    </View>
  }

  areInputsValid () {
    return this.state.password !== '' && this.state.password !== undefined &&
      this.state.newPassword === this.state.newPasswordRepeated
  }

  onSubmit () {
    if (this.areInputsValid() && !this.props.isLoading) {
      this.save()
    } else {
      this.displayValidationError()
    }
  }

  save () {
    let data = {}

    if (this.state.image) { data.image = {uri: this.state.image, isStatic: true, name: 'image.jpg', type: 'image/jpg'} }
    if (this.state.password) { data.password = this.state.password }
    if (this.state.newPassword) { data.newPassword = this.state.newPassword }

    data.username = 'kmlxn'

    this.props.save(data)
  }

  displayValidationError () {
    this.setState({isValidationErrorDisplayed: true})
  }

  async onImageClick () {
    const image = await openImage()
    this.setState({image})
  }
}

function mapStateToProps (state) {
  return {
    user: getCurrentUser(state),
    wasUpdateSuccessful: wasUpdateSuccessful(state, 'editProfile'),
    isLoading: isSceneLoading(state, 'editProfile')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    save (data) {
      dispatch(updateCurrentUser(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 55,
    padding: 5
  },
  avatar: {
    borderRadius: 999,
    width: 80,
    height: 80
  },
  avatarContainer: {
    borderRadius: 999,
    elevation: 6,
    width: 80,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  fab: {
    elevation: 6,
    backgroundColor: theme.accentColor,
    height: 56,
    width: 56,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 58,
    right: 10
  }
})
