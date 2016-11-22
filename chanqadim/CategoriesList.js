import React, { Component } from "react"
import { observer } from "mobx-react/native"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ListView, Image } from 'react-native'
import { Actions } from 'react-native-router-flux';

@observer
class RenderRow extends Component {
  render() {
    return <TouchableOpacity onPress={this.props.onPress} style={styles.category}>
      <Image style={{width: 80, height: 80}}
        source={{uri: this.props.category.image}}/>
      <Text>{this.props.category.name}</Text>
    </TouchableOpacity>
  }
}

@observer
export default class CategoriesList extends Component {
  constructor() {
    super()
  }

  renderRow(category, sectionID, rowID) {
    return <RenderRow onPress={() => this.onCategoryPress(category)} category={category} />
  }

  onCategoryPress(category) {
    Actions.bundles({category})
  }

  render() {
    const { dataSource } = this.props.store

    return <View style={styles.container}>
      <ListView
        enableEmptySections
        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', flex: 1}}
        dataSource={dataSource}
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
  },
  category: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    alignItems: 'center',
    width: 100,
    height: 100,
  },
})