import React, { Component } from 'react'

import TodoStore from "./TodoStore"
import TodoList from "./TodoList"

export default class Main extends Component {
    render() {
        return <TodoList store={TodoStore} />
    }
}