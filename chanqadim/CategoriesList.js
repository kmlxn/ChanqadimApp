import React, { Component } from "react"
import { observer } from "mobx-react/native"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ListView, Image } from 'react-native'
import { Actions } from 'react-native-router-flux';

@observer
class RenderRow extends Component {
  render() {
    return <View style={styles.category}>
      <Image style={{width: 80, height: 80}}
        source={{uri: this.props.category.image}}/>
      <Text>{this.props.category.name}</Text>
    </View>
  }
}

@observer
export default class CategoriesList extends Component {
  constructor() {
    super()
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  filter(text) {
    this.props.store.filter = text
  }

  onNewCategoryButtonSubmit() {
      this.props.store.createCategory(this.state.newCategory)
  }

  onNewCategoryInputChange(text) {
    this.setState({newCategory: text})
  }

  renderRow(category, sectionID, rowID) {
    return <RenderRow category={category} />
  }

  render() {
    const { clearComplete, filter, categories, dataSource } = this.props.store

    return <View style={styles.container}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', margin: 5}}>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.onNewCategoryButtonSubmit()}>
          <Text style={{textAlign: 'center', fontSize: 30}}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={{flex: 3, backgroundColor: '#f2f2f2', marginLeft: 5}}
          onChangeText={text => this.onNewCategoryInputChange(text)} />
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', margin: 5}}>
        <Text style={{flex: 1, textAlign: 'center'}}>Filter</Text>
        <TextInput
          style={{flex: 3, backgroundColor: '#f2f2f2', marginLeft: 5}}
          onChangeText={text => this.filter(text)} />
      </View>
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
    marginTop: 45,
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