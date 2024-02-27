import React, { useState } from 'react';
import styles from '../../styles/Home.module.css'; // CSS 모듈 import
import { useRouter } from 'next/router';

const _mainText: React.FC = () => {
  const router = useRouter();

  // 비로그인 시 입장 이후 로그인 창
  // 로그인 시 게임 로비 입장 
  const startJoin = () => {
    // TODO    
    // if not login
    router.push('../login')
    
    // else
    
    console.log('입장!');
  };

  return (
    <div className={[styles.container, styles.noDrag].join(" ")}>
      <h1 className={`${styles.title}, ${styles.container}`}>TEAM SS MAFIA</h1>
      <div className={styles.inbox_msg}>
        <p className={styles.description}>RULES</p>
        <p className={styles.description}>각 게임은 시민 : 6명, 마피아 : 2명으로 구성된다.</p>
        <p className={styles.description}>플레이어의 상태는 '생존'과 '사망'으로 구분되며, '사망' 상태일 경우 채팅 참여를 포함한 게임 내 상호작용을 수행할 수 없다.</p>
        <p className={styles.description}>시민의 승리 : 모든 마피아 플레이어의 상태가 '사망' 상태인 경우</p>
        <p className={styles.description}>마피아의 승리 : 마피아 플레이어가 시민 플레이어보다 같거나 많은 경우</p>
        <p className={styles.description}>게임은 턴제로 이루어지며, 각 턴은 다음과 같이 구성된다</p>
        <p className={styles.description}>낮 : 전체 채팅</p>
        <p className={styles.description}>저녁 : 사망자 투표</p>
        <p className={styles.description}>밤 : 사망자 처형 및 사망자 직업 공개</p>
        <p className={styles.description}>새벽 1 : 마피아 투표</p>
        <p className={styles.description}>새벽 2 : 결과 정리</p>
        <button className={styles.button} onClick={startJoin}>입장</button>
      </div>
    </div>
  );
};

export default _mainText;