import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ks-react-burger-builder.firebaseio.com'
});

export default instance;