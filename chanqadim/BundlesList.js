import React, { Component } from "react"
import { observer } from "mobx-react/native"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ListView, Image } from 'react-native'

@observer
class RenderRow extends Component {
  render() {
    return <View style={styles.bundle}>
      <Image style={{width: 80, height: 80}}
        source={{uri: this.props.bundle.image}}/>
      <Text>{this.props.bundle.name}</Text>
    </View>
  }
}

@observer
export default class BundlesList extends Component {
  constructor() {
    super()
  }

  renderRow(bundle, sectionID, rowID) {
    return <RenderRow bundle={bundle} />
  }

  render() {
    console.log('categpry', this.props.category);
    this.props.store.loadBundles(this.props.category)
    const {bundlesDataSource} = this.props.store

    return <View style={styles.container}>
      <ListView
        enableEmptySections
        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', flex: 1}}
        dataSource={bundlesDataSource}
        renderRow={this.renderRow.bind(this)}
      />
    </View>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 45,
  },
  bundle: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    alignItems: 'center',
    width: 100,
    height: 100,
  },
})