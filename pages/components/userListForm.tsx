import React, { useEffect, useState } from 'react';
import styles from '../../styles/UserList.module.css';
import mafia_reverse from '../../Images/gun_reverse.png'; // LogoReverse
import police_reverse from '../../Images/police_reverse.png'; // LogoReverse
import doctor_reverse from '../../Images/doctor_reverse.png'; // LogoReverse
import citizen from '../../Images/citizen.png';//add
import Image from 'next/image'; // next/image 패키지 import
import { getSocket } from '../utils/ClientSocket'; // Socket.ts 파일에서 getSocket 함수를 import
import { getRoom } from '../utils/Room';

interface UserRole {
  role: string;
}

const _userListForm: React.FC = () => {
  const [userList, setUserList] = useState<string[]>([]);
  const socket = getSocket(); 
  const [userRole, setUserRole] = useState<UserRole>({ role: '' }); // 역할 상태 추가
  

  useEffect(() => {
    socket.emit('joinGame', getRoom());

    socket.on('joinGame', (users: string[]) => {
      setUserList(users);
      console.log(users);
    });

    socket.on('roleAssignment', (role: string) => { // 역할 할당을 처리하는 부분 추가
      setUserRole({ role });
    });

    socket.on('reloadGame', (user: string) => {
      setUserList(prevUsers => prevUsers.filter(existingUser => existingUser !== user));
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
            {userList.map((user, index) => (
              <li key={index}>{user}</li>
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
