import React from "react";
import "./App.css";
import {Button,Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonAppBar from './menu'



function Todo({ todo, index, markTodo, removeTodo, }) {
  return (
    
    <div className="todo">
      <Card className="cardDimesione">
        <Card.Header>

          {todo.date && (
            <small /*className="text-muted cardDimRight"*/ className={todo.isDone ? "completed text-muted cardDimRight" : "text-muted cardDimRight"}>
              Aggiunto il {new Date(todo.date).toLocaleString()}
            </small>
          )}
        </Card.Header>
        <Card.Body>
          <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
            {todo.text}
          </span>
          <Button className="btnConfDel" variant="outline-success" onClick={() => markTodo(index)}>
            ✓
          </Button>{" "}
          <Button className="btnConfDel" variant="outline-danger" onClick={() => removeTodo(index)}>
            ✕
          </Button>
          
          
        </Card.Body>
      </Card>
    </div>
  );
}




function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo({
      text: value,
      date: Date.now() // aggiunge la data corrente come proprietà date dell'oggetto todo
    });
    setValue("");
  };





  return (
    <Form className="dimForm" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Cose da fare</Form.Label>
        <Form.Control type="text" id="input" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Aggiungi Todo" />
      </Form.Group>
      <Button className="bottone" type="submit" >
        Aggiungi
      </Button>
    </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = todo => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
      <ButtonAppBar/>       
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card className="code" key={index}>
              <Card.Body>
                <Todo
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


export default App;