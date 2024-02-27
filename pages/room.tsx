import React, { useState } from 'react';
import styles from '../styles/Room.module.css'; // CSS 모듈 import
import _logo from './components/logo';
import _roomForm from './components/roomForm';

const LobbyForm: React.FC = () => {
  
  // TODO >> 방 리스트 서버 / 클라 통신으로 업데이트 필요
  return (
    <div className={[styles.lobby_wrapper, styles.noDrag].join(" ")} style={{minHeight: '100vh'}}>
      <_logo/>
      <_roomForm/>
    </div>
  );
};

export default LobbyForm;