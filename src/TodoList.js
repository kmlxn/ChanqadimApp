import React from "react"
import { observer } from "mobx-react/native"
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'


@observer
export default class TodoList extends React.Component {
  filter(text) {
    this.props.store.filter = text
  }

  toggleComplete(todo) {
    todo.complete = !todo.complete
  }

  onNewTodoButtonSubmit() {
      this.props.store.createTodo(this.state.newTodo)
  }

  onNewTodoInputChange(text) {
    this.setState({newTodo: text})
  }

  render() {
    const { clearComplete, filter, filteredTodos, todos } = this.props.store

    const todoLis = filteredTodos.map(todo => (
      <View key={todo.id} style={{flex: 1, flexDirection: 'row', margin: 5, borderTopWidth: 1, alignItems: 'center'}}>
        <TouchableOpacity style={{flex: 1}} onPress={this.toggleComplete.bind(this, todo)}>
          <Text style={{textAlign: 'center', fontSize: 30}}>{todo.complete ? '✓' : 'o'}</Text>
        </TouchableOpacity>
        <Text style={{flex: 3}}>{todo.value}</Text>
      </View>
    ))

    return <View>
      <Text style={{fontSize: 30}}>todos</Text>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', margin: 5}}>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.onNewTodoButtonSubmit()}>
          <Text style={{textAlign: 'center', fontSize: 30}}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={{flex: 3, backgroundColor: '#f2f2f2', marginLeft: 5}}
          onChangeText={text => this.onNewTodoInputChange(text)} />
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', margin: 5}}>
        <Text style={{flex: 1, textAlign: 'center'}}>Filter</Text>
        <TextInput
          style={{flex: 3, backgroundColor: '#f2f2f2', marginLeft: 5}}
          onChangeText={text => this.filter(text)} />
      </View>
      {todoLis}
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', margin: 5}}>
        <TouchableOpacity style={{flex: 1}} onPress={clearComplete}>
          <Text style={{textAlign: 'center'}}>Clear Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  }
}