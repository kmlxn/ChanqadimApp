import React, { Component } from "react"
import { observer } from "mobx-react/native"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux';

@observer
class RenderRow extends Component {
  render() {
    console.log('rendredrow', this.props);
    return <View key={this.props.category.id} style={{flex: 1, flexDirection: 'row', margin: 5, borderTopWidth: 1, alignItems: 'center', width: 50, height: 50}}>
      <Text style={{flex: 3}}>{this.props.category.name}</Text>
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

    return <View style={{marginTop: 55, flex: 1}}>
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
        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', flex: 1, width: 300}}
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    </View>
  }
}