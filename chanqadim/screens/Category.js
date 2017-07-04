import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react/native'
import { View, Text, TouchableOpacity, StyleSheet, ListView, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { goToBundle } from '../navigation'
import { getActiveCategoryBundles } from '../reducers'
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
class Category extends Component {
  static propTypes = {
    scenes: PropTypes.object,
    categories: PropTypes.object,
    bundles: PropTypes.array
  }

  constructor () {
    super()
    this.listDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  renderRow (bundle, sectionID, rowID) {
    return <RenderRow bundle={bundle} onPress={() => this.onBundlePress(bundle)} />
  }

  onBundlePress (bundle) {
    goToBundle(bundle)
  }

  makeContent () {
    if (this.props.scenes.category.isFetching) {
      return <ActivityIndicator />
    } else {
      const dataSource = this.listDataSource.cloneWithRows(this.props.bundles)

      return <ListView
        enableEmptySections
        initialListSize={20}
        contentContainerStyle={styles.bundles}
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    }
  }

  render () {
    return <View style={styles.container}>
      {this.makeContent()}
    </View>
  }
}

const mapStateToProps = state => ({
  bundles: getActiveCategoryBundles(state),
  categories: state.categories,
  scenes: state.scenes
})

export default connect(mapStateToProps)(Category)

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
