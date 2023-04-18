import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const API = 'https://www.pre-onboarding-selection-task.shop'
  var config = {
    headers: {     
      'Content-type': 'application/json; charset=utf-8'
    }
  };
  const movePage = useNavigate();
  const [disable,setDisable] = useState(false);

  function isDisabled() {
    const Email_val = document.getElementById('Email').value;
    const PW_val = document.getElementById('PW').value;
    if(Email_val.indexOf('@') === -1){ // 존재한다면 -1이 아닌 숫자가 반환됨
      console.log(PW_val.length)
      setDisable(true);
      setTimeout(() => setDisable(false),1500);
      alert("올바른 이메일 형식이 아닙니다.");
    };
  }

  const axiosPost = (a,b) => {
    axios
    .post(`${API}/auth/signin`, {
      email: a,
      password: b
    }, config )
    .then((res) => {
      localStorage.setItem("access_token", res.data.access_token);
      movePage('/todo');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    const PW_val= document.getElementById('PW').value;
    const Email_val = document.getElementById('Email').value;
    axiosPost(Email_val,PW_val);
  }
  return (
    <div>
      <div>
        <h2>로그인 페이지</h2>
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email-input"> 이메일
        <input 
          id='Email'
          data-testid="email-input"
          required
          placeholder="ID를 입력해주세요." 
        />
        </label><br/>
        <label htmlFor="password-input"> 비밀번호
        <input
          id="PW" 
          data-testid="password-input" 
          required
          placeholder="PW를 입력해주세요."
          pattern=".{8,}"
          />
        </label><br/>
        <button 
          onClick={isDisabled} 
          data-testid="signin-button"
          disabled={disable}
        >
          회원가입
        </button>
      </form>
    </div>
  )
}

export default Signin;