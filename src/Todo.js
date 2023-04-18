import React, { useState, useEffect } from "react";
import axios from "axios";
import List from './todolist.js'

function Todo() {
  const API = 'https://www.pre-onboarding-selection-task.shop'
  const access_token = localStorage.getItem("access_token");
  const [todoData, setTododata] = useState([]);
  
  function makeList(e) {
    e.preventDefault();
    const innerInput = document.getElementById('todoWrite').value;
    axiosPost(innerInput);
  }
  var todoPost = {
    headers : {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }
  }
  var todoGet = {
    headers : {
      Authorization: `Bearer ${access_token}`
    }
  }

  const firstGet = () => {
    axios.get(`${API}/todos`,
    todoGet)
    .then((res) => {
        setTododata(res.data);
      }).catch((error) => {
        console.log(error);
      })
  }
  useEffect(() => firstGet(), []);
  

  const axiosPost = (innerInput) => {
    axios.post(`${API}/todos`, {
      todo : innerInput
    },todoPost)
    .then((res) => {
      console.log(res)
      axios.get(`${API}/todos`,
      todoGet)
        .then((res) => {
          console.log(res.data);
          setTododata(res.data);
        }).catch((error) => {
          console.log(error);
        })
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return(
    <div>
      <h1> Todo List </h1>
      <form onSubmit={makeList}>
        <label htmlFor="todoWrite"> write down your todo<br/>
          <input 
            id='todoWrite'
            data-testid="new-todo-input"
            name="todoWrite"
            required
            placeholder="할 일을 적어주세요."
          />
        </label>
        <button
          data-testid="new-todo-add-button"
        >Add to List
        </button>
      </form>
      <div id='allList'>
        {todoData.length < 1 ? undefined : todoData.map((item) => 
        <div>
          <List 
            key={item.id}
            id={item.id} 
            todo={item.todo} 
            isCompleted={item.isCompleted} 
            userId={item.userId}
          />
        </div>
        )}
      </div>
    </div>
  )
}

export default Todo;