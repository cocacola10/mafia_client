import React, { useState } from 'react';
import styles from '../../styles/User.module.css'; // CSS 모듈 import
import { useRouter } from 'next/router';

const _createForm: React.FC = () => {
  const router = useRouter();

  // 회원가입 
  const createuser = () => {
    // TODO 회원가입 통신
    router.push('../login')
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 기본 동작 방지
    const formData = new FormData(event.currentTarget);
    const userId = formData.get('userID') as string;
    const userPassword = formData.get('userPassword') as string;
    const userRePassword = formData.get('userRePassword') as string;
    const userName = formData.get('userName') as string;
    const userEmail = formData.get('userEmail') as string;
    
    // 서버로 데이터 전송 및 로그인 처리
    console.log('아이디:', userId);
    console.log('비밀번호:', userPassword);
    console.log('비밀번호 재입력:', userRePassword);
    console.log('이름:', userName);
    console.log('이메일:', userEmail);
  };

  return (
    <div className={[styles.login_wrapper, styles.noDrag].join(" ")}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userId" placeholder="ID" className={styles.login_wrapper_input}/>
        <input type="password" name="userPassword" placeholder="PASSWORD" className={styles.login_wrapper_input}/>
        <input type="password" name="userRePassword" placeholder="RETYPE PASSWORD" className={styles.login_wrapper_input}/>
        <input type="text" name="userName" placeholder="NICKNAME" className={styles.login_wrapper_input}/>
        <input type="text" name="userEmail" placeholder="EMAIL" className={styles.login_wrapper_input}/>
        <input type="submit" value="회원가입" className={styles.login_form_button} onClick={createuser}/>
      </form>
    </div>
  );
};
export default _createForm;