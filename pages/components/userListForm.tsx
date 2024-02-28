import React, { useEffect, useState } from 'react';
import styles from '../../styles/UserList.module.css';
import mafia_reverse from '../../Images/gun_reverse.png'; // LogoReverse
import police_reverse from '../../Images/police_reverse.png'; // LogoReverse
import doctor_reverse from '../../Images/doctor_reverse.png'; // LogoReverse
import citizen from '../../Images/citizen.png'; // add
import Image from 'next/image'; // next/image 패키지 import
import { getSocket } from '../utils/ClientSocket'; // Socket.ts 파일에서 getSocket 함수를 import
import { getRoom } from '../utils/Room';

interface User {
  name: string;
}

interface UserRole {
  role: string;
}

const _userListForm: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]); // 변경된 부분: userList 타입 변경
  const socket = getSocket(); 
  const [userRole, setUserRole] = useState<UserRole>({ role: '' });

  useEffect(() => {
    socket.emit('joinGame', getRoom());

    socket.on('joinGame', (users: string[]) => {
      // 변경된 부분: userList에 문자열 배열이 아니라 User 객체 배열을 설정
      const usersWithNames: User[] = users.map(user => ({ name: user }));
      setUserList(usersWithNames);
      console.log(usersWithNames);
    });

    socket.on('roleAssignment', (info: { playerName: string; role: string }) => { 
      setUserRole({ role: info.role });
    });

    socket.on('playerInfo', (players: User[]) => { // 변경된 부분: players의 타입을 User 배열로 지정
      setUserList(players);
    });

    socket.on('reloadGame', (user: string) => {
      // 변경된 부분: user의 타입이 string인지 확인 필요
      setUserList(prevUsers => prevUsers.filter(existingUser => existingUser.name !== user));
    });
  }, []);

  return (
    <div className={`${styles.colMd8} ${styles.colMdOffset2} ${styles.bootstrap} ${styles.snippets} ${styles.bootdeys} ${styles.inbox_msg}`}>
      <div className={`${styles.widgetContainer} ${styles.scrollable} ${styles.list} ${styles.rollodex}`}>
        <div className={styles.heading}>
          <h2>Users</h2>
        </div>
        <div className={styles.widgetContent}>
          <ul>
            {userList.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
        <div className={styles.widgetContent}>
          <h2>My role</h2>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            {userRole.role === 'Mafia' && (<><Image src={mafia_reverse} alt="Mafia" width={145} height={160} />Mafia</>)}
            {userRole.role === 'Police' && (<><Image src={police_reverse} alt="Police" width={145} height={160} />Police</>)}
            {userRole.role === 'Doctor' && (<><Image src={doctor_reverse} alt="Doctor" width={145} height={160} />Doctor</>)}
            {userRole.role === 'Citizen' && (<><Image src={citizen} alt="Citizen" width={145} height={160} />Citizen</>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default _userListForm;
