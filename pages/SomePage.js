import axios from 'axios';

const userId = '123'; // 사용자 ID
axios.get(`/api/user/${userId}`)
  .then(response => {
    const userInfo = response.data;
    // 받아온 유저 정보를 화면에 표시하거나 다른 작업을 수행
  })
  .catch(error => {
    console.error('Error fetching user info:', error);
  });
