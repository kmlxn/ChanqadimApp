import React, { Component } from 'react'
import { observer } from 'mobx-react/native'
import { View, Text, TouchableOpacity,
  StyleSheet, ListView, Image, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import {goToProfileEdit} from '../navigation.js'
import theme from '../theme'

@observer
class RenderRow extends Component {
  render () {
    return <View style={styles.bundle}>
      <Image style={styles.bundleImage}
        source={{uri: this.props.bundle.image}} />
      <View style={styles.title}>
        <Text style={styles.titleText}>{this.props.bundle.name}</Text>
      </View>
    </View>
  }
}

@observer
export default class UserProfile extends Component {
  renderRow (bundle, sectionID, rowID) {
    return <RenderRow bundle={bundle} />
  }

  componentDidMount () {
    this.props.store.loadUser()
  }

  renderHeader (user) {
    const img = user.image && <Image style={styles.userImage} source={{uri: user.image}} />

    return <View style={styles.header}>
      {img}
      <Text style={styles.userInfo}>{user.username}</Text>
      <TouchableOpacity onPress={() => this.onEditPress(user)}>
        <Icon name='pencil' size={30} color={theme.accentColor} />
      </TouchableOpacity>
    </View>
  }

  render () {
    const { user, userBundlesDataSource } = this.props.store

    return <View style={styles.container}>
      <ListView
        enableEmptySections
        renderHeader={() => this.renderHeader(user)}
        contentContainerStyle={styles.bundles}
        dataSource={userBundlesDataSource}
        renderRow={this.renderRow.bind(this)}
      />
    </View>
  }

  onEditPress (user) {
    goToProfileEdit(user)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50,
    marginBottom: 50
  },
  bundle: {
    margin: 5,
    alignItems: 'center',
    width: theme.tileWidth,
    height: theme.tileHeight
  },
  bundleImage: {
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
  },
  header: {
    flexDirection: 'row',
    height: 100,
    width: Dimensions.get('window').width - 50,
    alignItems: 'center'
  },
  userInfo: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center'
  },
  userImage: {
    width: 80,
    height: 80
  },
  bundles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
})
