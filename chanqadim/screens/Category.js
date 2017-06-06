import React, { Component } from 'react'
import { observer } from 'mobx-react/native'
import { View, Text, TouchableOpacity, StyleSheet, ListView, Image } from 'react-native'

import { goToBundle } from '../navigation'
import theme from '../theme'

@observer
class RenderRow extends Component {
  render () {
    return <TouchableOpacity style={styles.bundle} onPress={this.props.onPress}>
      <Image style={styles.image}
        source={{uri: this.props.bundle.image}} />
      <View style={styles.title}>
        <Text style={styles.titleText}>{this.props.bundle.name}</Text>
      </View>
    </TouchableOpacity>
  }
}

@observer
export default class Category extends Component {
  renderRow (bundle, sectionID, rowID) {
    return <RenderRow bundle={bundle} onPress={() => this.onBundlePress(bundle)} />
  }

  onBundlePress (bundle) {
    goToBundle(bundle)
  }

  componentWillMount () {
    this.props.store.loadBundles(this.props.category)
  }

  componentWillReceiveProps (nextProps) {
    this.props.store.loadBundles(nextProps.category)
  }

  render () {
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
    paddingTop: 10
  },
  bundles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  bundle: {
    margin: 5,
    alignItems: 'center',
    width: theme.tileWidth,
    height: theme.tileHeight
  },
  image: {
    width: theme.tileWidth,
    height: theme.tileHeight
  },
  title: {
    backgroundColor: theme.tileTitleBackgroundColor,
    position: 'absolute',
    width: theme.tileWidth,
    bottom: 0
  },
  titleText: {
    color: 'white',
    textAlign: 'center'
  }
})
