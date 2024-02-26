import React from 'react';
import _logo from './components/logo';
import _mainText from './components/mainText';
import styles from '../styles/Home.module.css'; // CSS 모듈 import

const indexPage: React.FC = () => {
  return (
    <div className={[styles.container, styles.noDrag].join(" ")} style={{minHeight: '100vh'}}>
      <_logo/>
      <_mainText/>
    </div>
    
  );
};
export default indexPage;