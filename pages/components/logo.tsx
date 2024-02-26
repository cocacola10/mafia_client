import React, { useState } from 'react';
import Image from 'next/image'; // next/image 패키지 import
import Logo from '../../Images/mafia.jpg'; // Logo
import Logo_reverse from '../../Images/mafia_reverse.jpg'; // LogoReverse
import styles from '../../styles/Home.module.css'; // CSS 모듈 import
import { useRouter } from 'next/router';
import { getSocket } from '../utils/ClientSocket'; // Socket.ts 파일에서 getSocket 함수를 import
import { getRoom, setRoom } from '../utils/Room'; // Socket.ts 파일에서 getSocket 함수를 import

const _logo: React.FC = () => {

  const router = useRouter();
  const socket = getSocket(); // Socket 가져오는 함수 사용
  // 이미지 상태 관리
  const [isHovered, setIsHovered] = useState(false);

  // 로고 오버 핸들러
  const handleMouseOver = () => {
    setIsHovered(true);
  };
 
  // 로고 리브 핸들러
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const logoClick = () => {
    router.push('../');
    socket.emit('quitRoom', getRoom());
  };

  return (
    <div className={[styles.container, styles.noDrag].join(" ")}>
      <a onClick={logoClick}>
        <Image  src={isHovered ? Logo : Logo_reverse} alt="Logo"
            width={180} height={200} 
            onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        </Image>
      </a>
      <br></br>
    </div>
  );
};
export default _logo;