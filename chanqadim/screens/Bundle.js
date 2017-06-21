import React, { Component } from 'react'
import { observer } from 'mobx-react/native'
import { View, Text, StyleSheet, ListView, Image, Dimensions } from 'react-native'

@observer
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

@observer
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

@observer
export default class Bundle extends Component {
  renderRow (bundle, sectionID, rowID) {
    return <RenderRow bundle={bundle} />
  }

  renderHeader (bundle) {
    return <Header bundle={bundle} />
  }

  componentWillReceiveProps () {
    this.props.mobxStore.loadBundle(this.props.bundle)
  }

  componentWillMount () {
    this.props.mobxStore.loadBundle(this.props.bundle)
  }

  render () {
    const {bundle, bundleProductsDataSource} = this.props.mobxStore

    if (Object.keys(bundle).length === 0) { return <Text>Loading...</Text> }

    return <View style={styles.container}>
      <ListView
        enableEmptySections
        renderHeader={() => this.renderHeader(bundle)}
        dataSource={bundleProductsDataSource}
        renderRow={this.renderRow.bind(this)}
      />
    </View>
  }
}

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
