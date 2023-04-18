import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const API = 'https://www.pre-onboarding-selection-task.shop'
  const movePage = useNavigate();
  var config = {
    headers: {     
      'Content-type': 'application/json; charset=utf-8'
    }
  };

  const axiosPost = (a,b) => {
    axios
    .post(`${API}/auth/signup`, {
      email: a,
      password: b
    }, config )
    .then((res) => {
      console.log(res);
      movePage('/signin');

    })
    .catch((error) => {
      console.log(error);
    });
  }

  const [disable, setDisable] = useState(false); //버튼 비활성화 

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
  

  function onSubmit(e) {
    e.preventDefault();
    const PW_val= document.getElementById('PW').value;
    const Email_val = document.getElementById('Email').value;
    alert("제출완료")
    axiosPost(Email_val,PW_val);
  }

  return(
  <div>
    <div>
      <h2>회원가입 페이지</h2>
    </div>
    <form onSubmit={onSubmit}>
      <label htmlFor='Email'> Email </label>
      <input 
        id='Email'
        data-testid="email-input"
        name="Email" 
        required 
        placeholder="이메일을 입력해주세요."
      /><br />
      <label htmlFor='PW'> PW </label>
      <input 
        id='PW'
        data-testid="password-input"
        name='PW' 
        required 
        placeholder="비밀번호를 입력해주세요." 
        pattern=".{8,}"
      /><br/>
      <button 
        id="signBTN"
        data-testid="signup-button"
        disabled={disable}
        onClick={isDisabled}> 회원 가입 
      </button>
    </form>
  </div>
  )
}

export default Signup;