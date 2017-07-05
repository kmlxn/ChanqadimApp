import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, ListView, Image, Dimensions, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { getProducts } from '../reducers/products'
import { getCurrentSceneItemUrl, isCurrentSceneLoading, getBundle } from '../reducers'

class RenderRow extends Component {
  render () {
    return <View style={styles.bundle}>
      <Image style={{width: 80, height: 80, marginRight: 8}}
        source={{uri: this.props.bundle.image}} />
      <View>
        <Text style={{fontSize: 16}}>{this.props.bundle.name}</Text>
        <Text>{this.props.bundle.description}</Text>
        <Text>${this.props.bundle.price}</Text>
      </View>
    </View>
  }
}

class Header extends Component {
  render () {
    const {description, user} = this.props.bundle

    return <View style={styles.header}>
      <View style={styles.user}>
        <Image style={styles.userImage}
          source={{uri: user.image}} />
        <Text style={styles.userName}>{user.username}</Text>
      </View>
      <Text>{description}</Text>
    </View>
  }
}

class Bundle extends Component {
  static propTypes = {
    products: PropTypes.array,
    isLoading: PropTypes.bool,
    bundle: PropTypes.object
  }

  constructor () {
    super()
    this.listDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  renderRow (bundle, sectionID, rowID) {
    return <RenderRow bundle={bundle} />
  }

  renderHeader (bundle) {
    return <Header bundle={bundle} />
  }

  makeContent () {
    if (this.props.isLoading) {
      return <ActivityIndicator />
    }

    const dataSource = this.listDataSource.cloneWithRows(this.props.products)

    return <ListView
      enableEmptySections
      renderHeader={() => this.renderHeader(this.props.bundle)}
      dataSource={dataSource}
      renderRow={this.renderRow.bind(this)}
    />
  }

  render () {
    return <View style={styles.container}>
      {this.makeContent()}
    </View>
  }
}

const mapStateToProps = state => {
  const bundleUrl = getCurrentSceneItemUrl(state)

  return {
    products: getProducts(state, bundleUrl),
    isLoading: isCurrentSceneLoading(state),
    bundle: getBundle(state.bundles, bundleUrl)
  }
}

export default connect(mapStateToProps)(Bundle)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 55,
    marginBottom: 50
  },
  bundle: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    flex: 1,
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  header: {
    height: 100,
    width: Dimensions.get('window').width - 50
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center'
  },
  userImage: {
    width: 50,
    height: 50
  }
})
