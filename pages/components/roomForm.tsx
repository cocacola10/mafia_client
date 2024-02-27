import React, { useEffect, useState } from 'react';
import styles from '../../styles/Room.module.css'; // CSS 모듈 import
import Table from "react-bootstrap/Table";
import { useRouter } from 'next/router';
import { getSocket } from '../utils/ClientSocket'; // Socket.ts 파일에서 getSocket 함수를 import
import { getRoom, setRoom } from '../utils/Room'; 

interface RoomData {
  id: number;
  users: string[];
}

const _roomForm: React.FC = () => {
  const router = useRouter(); // Next.js의 useRouter 훅을 사용하여 라우터 객체를 가져옵니다.
  const socket = getSocket(); // 클라이언트 소켓을 가져오는 함수를 호출하여 소켓 객체를 가져옵니다.

  // 방 목록과 사용자 리스트를 관리하기 위한 상태들을 선언합니다.
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [isSuDo, setIsSuDo] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [userList, setUserList] = useState<string[]>([]);
  const [userCount, setUserCount] = useState<number>();

  useEffect(() => {
    setMounted(true); // 컴포넌트가 마운트됐을 때를 나타내는 mounted 상태를 true로 설정합니다.

    socket.emit('getRooms'); // 서버로 방 목록을 요청합니다.
    socket.on('roomsList', (roomsList: RoomData[]) => {
      setRooms(roomsList); // 서버에서 받은 방 목록을 상태에 업데이트합니다.
    });

    return () => {
      socket.off('roomsList'); // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    };
  }, []);

  useEffect(() => {
    setMounted(true); // 컴포넌트가 마운트됐을 때를 나타내는 mounted 상태를 true로 설정합니다.
    console.log(getRoom());
    
    socket.emit('joinUser', getRoom()); // 현재 방에 입장 요청을 서버에 전송합니다.

    socket.on('setUsers', (users: string[], count: number) => {
      setUserList(users); // 서버에서 받은 사용자 리스트를 상태에 업데이트합니다.
      setUserCount(count); // 현재 방에 있는 사용자 수를 상태에 업데이트합니다.

      setIsSuDo(count === 8); // 사용자 수가 8명인 경우 게임 시작 버튼을 활성화합니다.
    });

    socket.on('reloadUser', (func: string, user: string, roomId: number, count: number, admin: Boolean) => {
      if (func === 'join' && roomId === getRoom()){
        setUserList(prevUsers => [...prevUsers, user]); // 새로운 사용자가 방에 입장한 경우 사용자 리스트에 추가합니다.
        setUserCount(count); // 사용자 수를 업데이트합니다.

        if (count === 8) {
          setIsSuDo(true); // 사용자 수가 8명인 경우 게임 시작 버튼을 활성화합니다.
        }
      } else if (func === 'quit' && roomId === getRoom()){
        setUserList(prevUsers => prevUsers.filter(existingUser => existingUser !== user)); // 퇴장한 사용자를 사용자 리스트에서 제거합니다.
        setUserCount(count); // 사용자 수를 업데이트합니다.

        if (count !== 8) {
          setIsSuDo(false); // 사용자 수가 8명이 아닌 경우 게임 시작 버튼을 비활성화합니다.
        }
      }
    });

    socket.on('startGame', (roomId: number) => {
      if (roomId === getRoom()){
        router.push('../game'); // 게임이 시작되면 게임 페이지로 이동합니다.
      }
    });

    return () => {
      socket.off('reloadUser'); // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
      socket.off('setUsers'); // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    };
  }, []);

  const gameStart = () => {
    socket.emit('startGame', getRoom()); // 게임 시작 요청을 서버에 전송합니다.
    socket.emit('joinUser', getRoom()); // 게임 시작 후 서버에서 방에 입장하도록 함
  };

  const gameQuit = async () => {
    socket.emit('quitRoom', getRoom()); // 방을 나가는 요청을 서버에 전송합니다.
    setRoom(0); // 현재 방 번호를 초기화합니다.
    setIsSuDo(false); // 게임 시작 버튼을 비활성화합니다.
    await router.push('../lobby'); // 로비 페이지로 이동합니다.
  };

  return (
    mounted && ( // mounted 상태가 true인 경우에만 컴포넌트를 렌더링합니다.
      <div className={[styles.lobby_wrapper, styles.noDrag].join(" ")}>
        <Table striped bordered hover width={'600px'}>
          <thead>
            <div className={styles.lobby_wrapper}>
              <h2>{getRoom()}번방 ({userCount}/8)</h2>
            </div>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={index}>
                <th>{user}</th>
              </tr>
            ))}
          </tbody>
          <br />
        </Table>
        <div>
          {isSuDo && <button className={styles.lobby_form_button} onClick={gameStart} style={{margin:'10px'}}>게임 시작</button>}
          <button className={styles.lobby_form_button} onClick={gameQuit} style={{margin:'10px'}}>나가기</button>
        </div>
      </div>
    )
  );
};

export default _roomForm;
