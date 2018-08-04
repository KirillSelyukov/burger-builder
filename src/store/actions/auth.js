import * as actionTypes from '../../store/actions/actions';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_START_SUCCESS,
        authData: data
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_START_FAIL,
        error: error
    };
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCb5CTQi5_vI_D8T3tlGhxDgO74gBnmfyc', authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            });
    }
}