import React, { Component } from "react"
import { observer } from "mobx-react/native"
import { View, Text, TextInput, TouchableOpacity,
  StyleSheet, ListView, Image, Dimensions } from 'react-native'

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
export default class UserProfile extends Component {
  constructor() {
    super()
  }

  renderRow(bundle, sectionID, rowID) {
    return <RenderRow bundle={bundle} />
  }

  componentDidMount() {
    this.props.store.loadUser()
  }

  renderHeader(user) {
    return <View style={styles.header}>
      <Image style={styles.userImage}
        source={{uri: user.image}}/>
      <Text style={styles.userInfo}>{user.username}</Text>
    </View>
  }

  render() {
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
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50,
    marginBottom: 50,
  },
  bundle: {
    margin: 5,
    borderWidth: 1,
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  header: {
    flexDirection: 'row',
    height: 100,
    width: Dimensions.get('window').width - 50,
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  userImage: {
    width: 80,
    height: 80,
  },
  bundles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
})