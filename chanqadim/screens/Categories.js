import React, { Component } from "react"
import { observer } from "mobx-react/native"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ListView, Image, StatusBar } from 'react-native'
import Dimensions from 'Dimensions';
import { goToCategory } from '../navigation'

@observer
class RenderRow extends Component {
  render() {
    return <TouchableOpacity onPress={this.props.onPress} style={styles.category}>
      <Image style={styles.image}
        source={{uri: this.props.category.image}}/>
      <View style={styles.title}>
        <Text style={styles.titleText}>{this.props.category.name}</Text>
      </View>
    </TouchableOpacity>
  }
}

@observer
export default class Categories extends Component {
  constructor() {
    super()
  }

  renderRow(category, sectionID, rowID) {
    return <RenderRow onPress={() => this.onCategoryPress(category)} category={category} />
  }

  onCategoryPress(category) {
    goToCategory(category)
  }

  render() {
    const { dataSource } = this.props.store

    return <View style={styles.container}>
      <StatusBar backgroundColor={'#4dd0e1'} />
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
    backgroundColor: 'white',
    marginTop: 50,
    paddingTop: 10,
  },
  category: {
    margin: 5,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  image: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
  },
  title: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    width: Dimensions.get('window').width * 0.4,
    bottom: 0,
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
  }
})