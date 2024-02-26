import React, { useState } from 'react';
import styles from '../../styles/User.module.css'; // CSS 모듈 import
import _createForm from './createForm';
import { useRouter } from 'next/router';

const _loginForm: React.FC = () => {
  const router = useRouter();

  // 회원가입 
  const createuser = () => {
    router.push('../create')
  };

  const login = () => {
    router.push('../lobby')
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 기본 동작 방지
    const formData = new FormData(event.currentTarget);
    const userName = formData.get('userName') as string;
    const userPassword = formData.get('userPassword') as string;
    const rememberCheck = formData.get('rememberCheck') === 'on';
    
    // 서버로 데이터 전송 및 로그인 처리
    console.log('사용자명:', userName);
    console.log('비밀번호:', userPassword);
    console.log('아이디 저장 여부:', rememberCheck);
  };

  return (
    <div className={[styles.login_wrapper, styles.noDrag].join(" ")}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userName" placeholder="ID" className={styles.login_wrapper_input}/>
        <input type="password" name="userPassword" placeholder="PASSWORD" className={styles.login_wrapper_input}/>
        <label htmlFor="rememberCheck">
          <input type="checkbox" id="rememberCheck" name="rememberCheck" /> 아이디 저장하기
        </label>
        <input type="submit" value="로그인" className={styles.login_form_button} onClick={login}/>
        <button className={styles.login_form_button} onClick={createuser}>회원가입  </button>
      </form>
    </div>
  );
};
export default _loginForm;