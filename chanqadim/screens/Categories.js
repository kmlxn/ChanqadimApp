import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ListView, Image, StatusBar, ActivityIndicator } from 'react-native'

import { goToCategory } from '../navigation'
import theme from '../theme'
import { fetchCategories } from '../actions'
import { connect } from 'react-redux'

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

class Categories extends Component {
  static propTypes = {
    categories: PropTypes.object
  }

  constructor (props) {
    super(props)
    setTimeout(() => {
      this.props.dispatch(fetchCategories())
    }, 100)

    this.listDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  renderRow (category, sectionID, rowID) {
    return <RenderRow onPress={() => this.onCategoryPress(category)} category={category} />
  }

  onCategoryPress (category) {
    goToCategory(category)
  }

  makeContent (categories) {
    if (!categories.allIds || categories.isFetching) {
      return <ActivityIndicator />
    } else {
      const categories_ = categories.allIds.map(id => categories.byId[id])
      const dataSource = this.listDataSource.cloneWithRows(categories_)

      return <ListView
        enableEmptySections
        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    }
  }

  render () {
    const content = this.makeContent(this.props.categories)
    console.log(this.props.categories)

    return <View style={styles.container}>
      <StatusBar backgroundColor={theme.statusBarColor} />
      {content}
    </View>
  }
}

export default connect(({categories}) => ({categories}))(Categories)

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
