import React from "react";
import "./App.css";
const App = () => {
	const [todos, setTodos] = React.useState([]);
	const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
const [editingText, setEditingText] = React.useState("");

React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

	function handleSubmit(e) {
		e.preventDefault();

		const newTodo = {
			id: new Date().getTime(),
			text: todo.trim(),
			completed: false,
		};
		if (newTodo.text.length > 0) {
			setTodos([...todos].concat(newTodo));
			setTodo("");
		} else {
			alert("Enter Valid Task");
			setTodo("");
		}
	}
	function handleDelete(id) {
    console.log(id)
		if (id) {
      let newTodos = [...todos].filter((todo) => todo.id !== id)
			setTodos(newTodos);
		}else{
      alert("Ooops something went wrong!!!")
    }
	}
  function handleChecked(id){
    let newTodos = todos.map((todo)=>{
    if(todo.id === id){
      todo.completed = !todo.completed
    }
    return todo
    })
    setTodos(newTodos)
    console.log(todos);

  }
  function handleEdit(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }
	return (
		<div className="App">
			<h1>Todo List</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={(e) => setTodo(e.target.value)}
					placeholder="Add a new task"
					value={todo}
				/>
				<button type="submit">Add Todo</button>
			</form>
      <div>
			{todos.map((todo,index) =>{
			return	<div key={index}>
					<button type="button" onClick={()=> handleDelete(todo.id)}>Delete</button>
          <input type="checkbox" value={todo.completed} onChange={()=> handleChecked(todo.id)} />
          <small onClick={()=>handleEdit(todo)}>Edit</small>
<div>
  {todo.id === todoEditing ? (
  <input type="text" onChange={(e) => setEditingText(e.target.value)} />
) : (
<div>{todo.text}</div>
)}
</div>
<div className="todo-actions">
{todo.id === todoEditing ? (
<button onClick={() => handleEdit(todo.id)}>Submit Edits</button>
) : (
<button onClick={() => setTodoEditing(todo.id)}>Edit</button>
)}
</div>
		
      
      </div>
      }
	)
}
</div>
</div>
)};
export default App;
