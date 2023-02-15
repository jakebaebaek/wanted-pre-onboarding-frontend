import React from 'react';
import { useNavigate } from 'react-router-dom';


function Main(){
const getToken = localStorage.getItem("access_token");
const movePage = useNavigate();

function signinTOtodo(){
  getToken !== null ? movePage('/todo') : movePage('/signin')
};
function signupTOtodo() {
  getToken !== null ? movePage('/todo') : movePage('/signup')
};
function todoTOsignin() {
  getToken !== null ? movePage('/todo') : movePage('/signin')
};


  return (
    <div>
      <label>
        <h1>WELCOME to your Todo List</h1>
        <button id='todoBtn' onClick={todoTOsignin}> 
          Todo List
        </button>
      </label>
      <div>
        <button onClick={signupTOtodo}>
          Sign up 
        </button>
        <button onClick={signinTOtodo}>
          SignIn 
        </button>
      </div>
    </div>
  )
}

export default Main ;