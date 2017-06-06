import React, { Component } from 'react'
import { observer } from 'mobx-react/native'
import { View, Text, TouchableOpacity, StyleSheet, ListView, Image, StatusBar } from 'react-native'

import { goToCategory } from '../navigation'
import theme from '../theme'

@observer
class RenderRow extends Component {
  render () {
    return <TouchableOpacity onPress={this.props.onPress} style={styles.category}>
      <Image style={styles.image}
        source={{uri: this.props.category.image}} />
      <View style={styles.title}>
        <Text style={styles.titleText}>{this.props.category.name}</Text>
      </View>
    </TouchableOpacity>
  }
}

@observer
export default class Categories extends Component {
  renderRow (category, sectionID, rowID) {
    return <RenderRow onPress={() => this.onCategoryPress(category)} category={category} />
  }

  onCategoryPress (category) {
    goToCategory(category)
  }

  render () {
    const { dataSource } = this.props.store

    return <View style={styles.container}>
      <StatusBar backgroundColor={theme.statusBarColor} />
      <ListView
        enableEmptySections
        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}
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
    marginBottom: 50
  },
  category: {
    margin: 5,
    alignItems: 'center',
    width: theme.majorTileWidth,
    height: theme.majorTileHeight
  },
  image: {
    width: theme.majorTileWidth,
    height: theme.majorTileHeight
  },
  title: {
    backgroundColor: theme.tileTitleBackgroundColor,
    position: 'absolute',
    width: theme.majorTileWidth,
    bottom: 0
  },
  titleText: {
    color: 'white',
    textAlign: 'center'
  }
})
