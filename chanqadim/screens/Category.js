import React, { Component } from "react"
import { observer } from "mobx-react/native"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ListView, Image } from 'react-native'
import Dimensions from 'Dimensions';
import { goToBundle } from '../navigation'

@observer
class RenderRow extends Component {
  render() {
    return <TouchableOpacity style={styles.bundle} onPress={this.props.onPress}>
      <Image style={styles.image}
        source={{uri: this.props.bundle.image}}/>
      <View style={styles.title}>
        <Text style={styles.titleText}>{this.props.bundle.name}</Text>
      </View>
    </TouchableOpacity>
  }
}

@observer
export default class Category extends Component {
  constructor() {
    super()
  }

  renderRow(bundle, sectionID, rowID) {
    return <RenderRow bundle={bundle} onPress={() => this.onBundlePress(bundle)}/>
  }

  onBundlePress(bundle) {
    goToBundle(bundle)
  }

  componentWillMount() {
    this.props.store.loadBundles(this.props.category)
  }

  componentWillReceiveProps(nextProps) {
    this.props.store.loadBundles(nextProps.category)
  }

  render() {
    const {bundlesDataSource} = this.props.store

    return <View style={styles.container}>
      <ListView
        enableEmptySections
        initialListSize={20}
        contentContainerStyle={styles.bundles}
        dataSource={bundlesDataSource}
        renderRow={this.renderRow.bind(this)}
      />
    </View>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 55,
    marginBottom: 55,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  bundles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bundle: {
    margin: 5,
    borderWidth: 0.5,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
  },
  title: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    width: Dimensions.get('window').width * 0.3,
    bottom: 0,
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
  },
})