import React, { useState } from 'react';
import styles from '../styles/User.module.css'; // CSS 모듈 import
import _logo from './components/logo';
import _createForm from './components/createForm';

const CreateForm: React.FC = () => {
  return (
    <div className={[styles.login_wrapper, styles.noDrag].join(" ")} style={{minHeight: '100vh'}}>
      <_logo/>
      <_createForm/>
    </div>
  );
};

export default CreateForm;