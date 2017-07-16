import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableOpacity,
  StyleSheet, ListView, Image, Dimensions, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

import { goToProfileEdit } from '../navigation.js'
import { fetchCurrentUser } from '../actions'
import { getCurrentUserBundles, getCurrentUser, isSceneLoading } from '../reducers'
import theme from '../theme'

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

class UserProfile extends Component {
  static propTypes = {
    user: PropTypes.object,
    isLoading: PropTypes.bool
  }

  constructor () {
    super()
    this.listDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  renderRow (bundle, sectionID, rowID) {
    return <RenderRow bundle={bundle} />
  }

  componentDidMount () {
    this.props.onDidMount()
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

  makeContent () {
    if (this.props.isLoading) {
      return <ActivityIndicator />
    }

    const dataSource = this.listDataSource.cloneWithRows(this.props.bundles)

    return <ListView
      enableEmptySections
      renderHeader={() => this.renderHeader(this.props.user)}
      contentContainerStyle={styles.bundles}
      dataSource={dataSource}
      renderRow={this.renderRow.bind(this)}
      />
  }

  render () {
    return <View style={styles.container}>
      {this.makeContent()}
    </View>
  }

  onEditPress (user) {
    goToProfileEdit(user)
  }
}

function mapStateToProps (state) {
  return {
    user: getCurrentUser(state),
    isLoading: isSceneLoading(state, 'profile'),
    bundles: getCurrentUserBundles(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  onDidMount (id) {
    dispatch(fetchCurrentUser())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)

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
