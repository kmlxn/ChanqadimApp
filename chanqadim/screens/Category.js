import React, { Component } from "react"
import { observer } from "mobx-react/native"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ListView, Image } from 'react-native'
import { Actions } from 'react-native-router-flux';

@observer
class RenderRow extends Component {
  render() {
    return <TouchableOpacity style={styles.bundle} onPress={this.props.onPress}>
      <Image style={{width: 80, height: 80}}
        source={{uri: this.props.bundle.image}}/>
      <Text>{this.props.bundle.name}</Text>
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
    Actions.bundle({bundle})
  }

  componentDidMount() {
    this.props.store.loadBundles(this.props.category)
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
    backgroundColor: '#F5FCFF',
  },
  bundles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bundle: {
    margin: 5,
    borderWidth: 1,
    alignItems: 'center',
    width: 100,
    height: 100,
  },
})