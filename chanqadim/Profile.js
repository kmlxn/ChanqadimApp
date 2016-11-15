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

  render() {
    const { user, userBundlesDataSource } = this.props.store

    return <View style={styles.container}>
      <Text>{user.username}</Text>
      <ListView
        enableEmptySections
        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}
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
    flex: 1,
    margin: 5,
    borderWidth: 1,
    alignItems: 'center',
    width: 100,
    height: 100,
  },
})