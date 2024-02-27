import React, { useEffect, useState } from 'react';
import styles from '../../styles/Game.module.css'; // CSS 모듈 import
import { useRouter } from 'next/router';
import { getSocket } from '../utils/ClientSocket'; // Socket.ts 파일에서 getSocket 함수를 import
import { getRoom, setRoom } from '../utils/Room'; 
import axios from 'axios';

const _gameForm: React.FC = () => {
  const router = useRouter();
  const socket = getSocket(); 

  
  // 게임 시작 요청을 서버에 보내는 함수
  const startGame = () => {
    axios.post('/api/game/start')
      .then((response: { data: any; }) => {
        console.log('Game started:', response.data);
        // 게임 시작 후 필요한 로직 추가
      })
      .catch((error: any) => {
        console.error('Error starting game:', error);
      });
  };

  // 게임 시작 버튼 핸들러
  const handleStartGame = () => {
    startGame();
  };


  // 게임 나가기 핸들러
  const gameQuit = () => {
    socket.emit('quitGame', getRoom());
    setRoom(0);
    router.push('../lobby');
 };

  return (
    <div className={[styles.game_wrapper, styles.noDrag].join(" ")}>
      <button className={styles.game_form_button} onClick={gameQuit}>나가기</button>
    </div>
  );
};
export default _gameForm;