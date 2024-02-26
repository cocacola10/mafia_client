import React, { useState, useEffect } from 'react';
import styles from '../../styles/Room.module.css';
import Table from "react-bootstrap/Table";
import { useRouter } from 'next/router';
import { getSocket } from '../utils/ClientSocket';
import { getRoom, setRoom } from '../utils/Room';

const Lobby: React.FC = () => {
  const router = useRouter();
  const socket = getSocket();
  const [roomList, setRoomList] = useState([{ id: 0, owner: "", members: "" }]);

  const roomClick = (roomId: number) => {
    socket.emit('joinRoom', roomId);
  }

  const createRoom = () => {
    socket.emit('createRoom');
    router.push('../room');
  }

  useEffect(() => {
    socket.emit('joinLobby');

    socket.on('changeRoom', async (roomId: number) => {
      await setRoom(roomId);
    });

    socket.on('reloadRoom', (roomId: number, func: string, admin: string, members: number) => {
      if (func === "delete") {
        setRoomList(prevRoomList => prevRoomList.filter(room => room.id !== roomId));
      }
      else if (func === "create" || func === "join") {
        const newRoom = { id: roomId, owner: admin, members: members + '/8' };
        setRoomList(prevRoomList => {
          const updatedRoomList = prevRoomList.map(room => {
            if (room.id === roomId) {
              return { ...room, members: newRoom.members };
            } else {
              return room;
            }
          });

          if (!updatedRoomList.some(room => room.id === roomId)) {
            return [...updatedRoomList, newRoom];
          } else {
            return updatedRoomList;
          }
        });
      }
      else if (func === "quit"){
        const newRoom = { id: roomId, owner: admin, members: members + '/8' };
        setRoomList(prevRoomList => {
          const updatedRoomList = prevRoomList.map(room => {
            if (room.id === roomId) {
              return { ...room, members: newRoom.members };
            } else {
              return room;
            }
          });

          if (!updatedRoomList.some(room => room.id === roomId)) {
            return [...updatedRoomList, newRoom];
          } else {
            return updatedRoomList;
          }
        });
      }
    });

    socket.on('SuccessJoinRoom', (roomId: number) => {
      setRoom(roomId);
      router.push('../room');
    });

    socket.on('reloadLobby', (msg: []) => {
      const newRooms = msg.map(msg => {
        const { roomId, owner, members } = msg;
        return { id: roomId, owner: owner, members: members + '/8' };
      });
      setRoomList(prevRoomList => [...prevRoomList, ...newRooms]);
    });


    return () => {
      socket.off('reloadRoom');
      socket.off('SuccessJoinRoom');
      socket.off('joinLobby');
      socket.off('reloadLobby');
    };
  }, []);

  return (
    <div className={[styles.lobby_wrapper, styles.noDrag, styles.inbox_msg].join(" ")}>
      <div className={[styles.lobby_wrapper, styles.noDrag].join(" ")}>
        <Table width={'600px'}>
          <thead>
            <tr>
              <th>번호</th>
              <th>주인장</th>
              <th>인원</th>
            </tr>
          </thead>
          <tbody>
            {roomList.map(room => (
              room.id !== 0 && (
                <tr key={room.id} onClick={() => roomClick(room.id)}>
                  <th>{room.id}</th>
                  <th>{room.owner}</th>
                  <th>{room.members}</th>
                </tr>
              )
            ))}
          </tbody>
        </Table>
        <button className={styles.lobby_form_button} onClick={createRoom}>방 만들기</button>
      </div>
    </div>
  );
};

export default Lobby;
