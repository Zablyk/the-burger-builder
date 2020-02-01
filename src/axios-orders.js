import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-the-burger-builder-54abb.firebaseio.com/';
});

export default instance;

