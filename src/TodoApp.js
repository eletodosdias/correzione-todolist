import React, { Component } from 'react';
import TodoList from './TodoList'

class TodoApp extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = { todos: [] }
  // }

  state = {
    //prendere il value dell'input 
    value: "",
    todos: [],

    aggiunta: true,

    nomeCorrente: "",
    idCorrente: 0
  }

  //Metodo che prende i value digitati nell input e assegnato al value
  handleChange = (e) => {
    this.setState( () => {
      return { value :e.target.value }
    })
    //console.log(this.state.value);
  }


  handleAddTodo = (e) => {
    e.preventDefault();

    //Costruire l'oggetto che intendo aggiungere all'interno dell'array: deve avere il nome del todo e x l'id Date.now 
    const todoToAdd = {
      name: this.state.value,
      id: Date.now(), //per non avere id che possano essere uguali
    }

    // this.setState( () => {
    //   return{ todos: this.state.todos.concat(todoToAdd) }
    // })  // oppure:

    this.setState( (prevState) => {
      return{ 
        todos: prevState.todos.concat(todoToAdd),
        //per svuotare il value e il campo input:
        value: '' 
      }
    })

  }

  handleRemove = () => {
    this.setState( () => {
      return{ todos: []}
    })
  }

  handleRemoveTodo = (id) => {
    //bottone in todolist
    //elimina per id cliccato -> parametro dell'arrow function
    this.setState( (prevState) =>{
      //novo array todos con l'array senza l'id dell elem cliccato
      return { todos: prevState.todos.filter( (todo) => todo.id !== id ) }

      /* se clicco elimina item con id 3 , quando itera e arriva al valore id=3 dice false (perchè è true se è diverso da quello cliccato ) e  non me lo inserisce nel nuovo array */
    })
  }

  /*Modifica di un Todo
  al click di edit, la todo cliccata da modificare compare nel campo input e il btn + diventa salva
  
  condizione di view nel jsx
  aggiungiamo allo state aggiunta come booleano
  -
  metodo per la modifica
  
  handleEdit viene invocato dal componente figlio


  */

  handleEditForm = (todo) => {
    // this.setState( () => {
    //   return { aggiunta : false }
    // })
    this.setState( () => {
      return { 
        aggiunta : false,
        nomeCorrente : todo.name, 
        idCorrente: todo.id }
    })
  }
  handleEditTodo = (id, nuovoNome) => {
    /*cercare l'id che abbiano due id uguali, bisogna modificare l'elemento, ciclo for  
    per cercare l'id che è presente nel nostro array todos
    -> parametro: id + il nuovo nome(modificato dentro lo state) */
    const nuovoArray = this.state.todos
    
    for(let i = 0; i < nuovoArray; i++ ){
      if( nuovoArray[i].id === id ){
        nuovoArray[i].name = nuovoNome;
      }
    }

    this.setState( () => {
      return{ todos: nuovoArray }
    })

  }
  handleEditChange = (e) => {
    this.setState( () => {
      return { 
        nomeCorrente: e.target.value
      }
    })
  }
  onEditSubmit = (e) => {
    e.preventDefault();

    this.handleEditTodo( this.state.idCorrente, this.state.nomeCorrente );

  }


  render() {
    return (
      <>
        <h1>Todo App</h1>

        {
          this.state.aggiunta ? ( 
            <div>  
              <button onClick={this.handleRemove} >Remove All</button>
              
              <form onSubmit={this.handleAddTodo}>
                  <input type="text" onChange={this.handleChange} value={this.state.value} />
                  <button type="submit"> + </button>
              </form>
            </div>
          ) : (
            <div>
              <h1>Stai modificando la tua task:</h1>
              <form onSubmit={this.onEditSubmit}>
              <input type="text" value={this.state.nomeCorrente} onChange={this.handleEditChange} />
                  <button type="submit">Save</button>
              </form>
            </div>
          )
        }

        {/* per mostrare gli elementi aggiunti o eliminati lavoriamo su TodoList */}
        <TodoList todos={this.state.todos} removeTodo={this.handleRemoveTodo} edit={this.handleEditForm} />
      </>
    )
  }
}

export default TodoApp

 