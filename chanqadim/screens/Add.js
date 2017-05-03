import React, { Component } from "react"
import { observer } from "mobx-react/native"
import { View, Text, StyleSheet, Image, Dimensions,
  TouchableOpacity, TextInput, Picker } from 'react-native'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/FontAwesome';

import theme from '../theme'

@observer
export default class Add extends Component {
  constructor() {
    super()
    this.state = {type: 'bundle'}
  }

  componentDidMount() {
    this.props.store.loadUser()
    this.props.store.loadCategories(() => this.setState({
      categories: this.props.store.categories,
      category: this.props.store.categories[0].url,
    }))
  }

  async addBundle() {
    console.log('Add.js - addBundle', this.state);
    const bundle = await this.props.store.uploadBundle({
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      image: this.state.image,
    })

    if (bundle)
      Actions.bundle({bundle})
  }

  addProduct() {
    console.log('Add.js - addProduct', this.state);
    this.props.store.uploadProduct({
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      bundle: this.state.bundle,
      image: this.state.image,
    })
  }

  renderProduct() {
    const user = this.props.store.user

    if (!user)
      return <Text>Loading...</Text>

    const pickerBundles = user.bundles.map(bundle =>
      <Picker.Item key={Math.random()} label={bundle.name} value={bundle.url} />)

    return <View>
      <Text>Name</Text>
      <TextInput onChangeText={name => this.setState({name})}/>
      <Text>Description</Text>
      <TextInput onChangeText={description => this.setState({description})}/>
      <Text>Price</Text>
      <TextInput onChangeText={price => this.setState({price})}/>
      <Picker
        selectedValue={this.state.bundle || user.bundles[0].url}
        onValueChange={bundle => this.setState({bundle})}
      >
        {pickerBundles}
      </Picker>
      <TouchableOpacity onPress={() => this.openImage()}>
        {this.state.image ?
          <Image source={this.state.image} style={{width: 80, height: 80}}/>
          : <Text>Image</Text>
        }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.addProduct()}>
        <Icon name="save" size={30} color={theme.accentColor} />
      </TouchableOpacity>
    </View>
  }

  renderBundle() {
    if (this.state.categories === undefined || this.state.categories.length === 0)
      return <Text>Loading...</Text>

    const pickerCategories = this.state.categories.map(category =>
      <Picker.Item key={Math.random()} label={category.name} value={category.url}/>)

    const image = this.state.image ?
      <Image source={this.state.image} style={{width: 80, height: 80}}/>
      : <Text>Image</Text>

    return <View>
      <Text>Name</Text>
      <TextInput onChangeText={name => this.setState({name})}/>
      <Text>Description</Text>
      <TextInput onChangeText={description => this.setState({description})}/>
      <Picker
        selectedValue={this.state.category}
        onValueChange={category => this.setState({category})}
      >
        {pickerCategories}
      </Picker>
      <TouchableOpacity onPress={() => this.openImage()}>
        {image}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.addBundle()}>
        <Icon name="save" size={30} color={theme.accentColor} />
      </TouchableOpacity>
    </View>
  }

  render() {
    const body = this.state.type === 'bundle' ?
      this.renderBundle() : this.renderProduct()

    return <View style={styles.container}>
      {this.renderSwitch()}
      {body}
    </View>
  }

  switchToBundle() {
    this.setState({type: 'bundle'})
  }

  switchToProduct() {
    this.setState({type: 'product'})
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

  renderSwitch() {
    return <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => this.switchToBundle()}
        style={[
          styles.switch,
          {borderBottomColor: this.state.type === 'bundle' ? 'red' : 'white'}
        ]}
      >
        <Text style={{textAlign: 'center'}}>Bundle</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.switchToProduct()}
        style={[
          styles.switch,
          {borderBottomColor: this.state.type === 'product' ? 'red' : 'white'}
        ]}
      >
        <Text style={{textAlign: 'center'}}>Product</Text>
      </TouchableOpacity>
    </View>
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