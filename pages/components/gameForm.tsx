import React, { useEffect, useState } from 'react';
import styles from '../../styles/Game.module.css'; // CSS 모듈 import
import { useRouter } from 'next/router';
import { getSocket } from '../utils/ClientSocket'; // Socket.ts 파일에서 getSocket 함수를 import
import { getRoom, setRoom } from '../utils/Room'; 

const _gameForm: React.FC = () => {
  const router = useRouter();
  const socket = getSocket(); 

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