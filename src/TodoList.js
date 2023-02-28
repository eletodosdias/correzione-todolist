import React, { Component } from 'react'

export class TodoList extends Component {

    render() {
        return (
        <>
            <h2>Todo List:</h2>

            <ol>
                { this.props.todos.map( (t) => <li key={t.id} > 
                        {t.name} 
                        <button onClick={ () =>  this.props.removeTodo(t.id)} > X </button>  
                        <button onClick={ () => this.props.edit(t)} >Edit</button>
                    </li>) }
            </ol>
        </>
        )
    }
}

export default TodoList

/* 

<button onClick={this.props.removeTodo(t.id)} > X </button>
passando un arroe function all'onclick
l'id viene passato singolarmente renderizzato dal .map( )

mi elimina i singoli todo

Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.

*/