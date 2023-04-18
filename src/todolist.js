import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";


function list({id, todo, isCompleted, userId}) {
  const API = 'https://www.pre-onboarding-selection-task.shop';
  const access_token = localStorage.getItem("access_token");
  const CheckVal = useRef(isCompleted);//체크박스 값 확인용
  const [beforeUpd, setBeforeUpd] = useState("");
  const [checkBox, setCheckbox] = useState(isCompleted);

  useEffect(()=> setBeforeUpd(todo), []);
  useEffect(() => setCheckbox(checkBox), [])
  var DelTodo = { //delete axios header
    headers : {
      Authorization: `Bearer ${access_token}`
    }
  };
  var PutTodo = { //put axios header
    headers : {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }
  };

  const Putaxios = (a, b) => {
    console.log(todo,isCompleted)
    axios.put(`${API}/todos/${id}`,{
        todo: a,
        isCompleted : b  
    },PutTodo)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
  };

  const delaxios = () => { // 삭제 axios
    axios.delete(`${API}/todos/${id}`,DelTodo)
    .then((res) =>{
      console.log(res)
    }).catch((error) => {
      console.log(error);
    })
  };
  function delClick(e) { // 삭제 기능 함수
    const li = document.getElementById(`${id}`);
    li.remove();
    delaxios();
  }


  function checkon(e) {
    setCheckbox(e.target.checked)
    const span = document.getElementById(`${id}.sp`);
    Putaxios( span.innerHTML , e.target.checked);
  };
  
  function updClick() { //수정 및 제출, 취소 기능 함수
    const span = document.getElementById(`${id}.sp`);
    const modiBtn = document.getElementById(`${id}.up`);
    const deleteBtn = document.getElementById(`${id}.del`);
    const getspan = document.getElementById(`${id}.span`);

    const updInput = document.createElement('input');
    updInput.setAttribute("id", `${id}.new`)
    updInput.setAttribute("data-testid", "modify-input");

    const doneBtn = document.createElement(`button`);
    doneBtn.setAttribute("data-testid","modify-input");
    doneBtn.onclick = function doneupd(){
      const getInput = document.getElementById(`${id}.new`);
      span.innerHTML = getInput.value;
      setBeforeUpd(span.innerHTML);
      Putaxios(span.innerHTML, CheckVal.current);
      cancelBtn.remove();
      doneBtn.remove();
      getInput.remove();
      getspan.append(modiBtn,deleteBtn);
    }
    doneBtn.innerHTML ="제출";

    const cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("data-testid","cancel-button");
    cancelBtn.onclick = function cancelupd() {
      const getInput = document.getElementById(`${id}.new`);
      span.innerHTML = beforeUpd;
      console.log(beforeUpd)
      getInput.remove();
      doneBtn.remove();
      cancelBtn.remove();
      getspan.append(modiBtn,deleteBtn);
    }
    cancelBtn.innerHTML ="취소";
    
    updInput.value = span.innerText;
    span.innerText='';
    span.appendChild(updInput);
    modiBtn.remove();
    deleteBtn.remove();
    getspan.append(doneBtn, cancelBtn);
    }
  
  return (
    <div>
      <li id={id}>
        <label id ={`${id}.lab`}>
          <input onChange={checkon} id={`${id}.in`} type={"checkbox"} checked={checkBox}/>
          <span id={`${id}.sp`}>{todo}</span>
        </label>
          <span id ={`${id}.span`}>
          <button id={`${id}.up`}  onClick={updClick} data-testid="modify-button">수정</button>
          <button id={`${id}.del`} onClick={delClick} data-testid="delete-button">삭제</button>
          </span>
      </li>
    </div>
  );
};

export default list;