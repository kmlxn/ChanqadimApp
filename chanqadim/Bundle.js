import React, { Component } from "react"
import { observer } from "mobx-react/native"
import { View, Text, StyleSheet, ListView, Image } from 'react-native'

@observer
class RenderRow extends Component {
  render() {
    return <View style={styles.bundle}>
      <Image style={{width: 80, height: 80, marginRight: 8}}
        source={{uri: this.props.bundle.image}}/>
      <View>
        <Text style={{fontSize: 16}}>{this.props.bundle.name}</Text>
        <Text>{this.props.bundle.description}</Text>
        <Text>${this.props.bundle.price}</Text>
      </View>
    </View>
  }
}

@observer
export default class BundlesList extends Component {
  renderRow(bundle, sectionID, rowID) {
    return <RenderRow bundle={bundle}/>
  }

  componentDidMount() {
    this.props.store.loadBundle(this.props.bundle)
  }

  render() {
    const {bundleProductsDataSource} = this.props.store

    return <View style={styles.container}>
      <ListView
        enableEmptySections
        dataSource={bundleProductsDataSource}
        renderRow={this.renderRow.bind(this)}
      />
    </View>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 45,
  },
  bundle: {
    flexDirection: 'row',
    alignSelf: "stretch",
    flex: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
})