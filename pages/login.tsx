import React, { useState } from 'react';
import styles from '../styles/User.module.css'; // CSS 모듈 import
import _logo from './components/logo';
import _loginForm from './components/loginForm';
import _createForm from './components/createForm';

const LoginForm: React.FC = () => {

  return (
    <div className={[styles.login_wrapper, styles.noDrag].join(" ")} style={{minHeight: '100vh'}}>
      <_logo/>
      <_loginForm/>
    </div>
  );
};

export default LoginForm;