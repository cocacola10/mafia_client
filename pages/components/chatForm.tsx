import React, { useEffect, useState } from 'react';
import styles from '../../styles/Chat.module.css'; // CSS 모듈 import
import { getSocket } from '../utils/ClientSocket'; // Socket.ts 파일에서 getSocket 함수를 import
import { getRoom } from '../utils/Room'; 

const _chatForm: React.FC = () => {
  const socket = getSocket(); // Socket 가져오는 함수 사용

  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  function handleSendClick() {
    if (message.trim() != ''){
      socket.emit('message', getRoom(), message);
      setMessage('');
    }
  }

  useEffect(() => {
    socket.on('message', (roomId: any, data: string) => {
      if (roomId == getRoom()){
        setReceivedMessages(prevMessages => [...prevMessages, data]);
      }
    });
    return () => {
      socket.off('message');
    };
  }, []);
    
  // 메시지가 업데이트될 때마다 스크롤을 최하단으로 이동
  useEffect(() => {
    const chatHistory = document.getElementById('chat-history');
    if (chatHistory) {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }, [receivedMessages]);
  

  // TODO
  // @. DATE TO NICKNAME -> DB에서 가져와야 하기 때문에 후순위
  // @. 채널 분류 및 소켓 분류
  // @. 비속어 필터링 -> client side 왜? 서버 부하 줄이려고, 요즘 클라 컴터 좋다!
  return (
    <div className={styles.messaging}>
      <div className={styles.inbox_msg}>
        <div className={styles.mesgs}>
          <div className={styles.msg_history} id='chat-history'>
            {/* Message history items */}
            {/* Example of incoming message */}
            {receivedMessages.map((msg, index) => (
              <div key={index} className={styles.incoming_msg}>
                <div className={styles.received_msg}>
                  <div className={styles.received_withd_msg}>
                    <p>{msg}</p>
                    <span className={styles.time_date}> TODO : date to nickname change </span>
                  </div>
                </div>
              </div>
            ))}
            {/* End of message history items */}
          </div>
          <div className={styles.type_msg}>
            <div className={styles.input_msg_write}>
              <input type="text" className={styles.write_msg} placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') {handleSendClick();}}}/>
              <button className={styles.msg_send_btn} type="button" onClick={handleSendClick}><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default _chatForm;
