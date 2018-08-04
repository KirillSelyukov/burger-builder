import * as actionTypes from '../../store/actions/actions';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = ({idToken, localId}) => {
    return {
        type: actionTypes.AUTH_START_SUCCESS,
        idToken,
        userId: localId
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_START_FAIL,
        error: error
    };
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCb5CTQi5_vI_D8T3tlGhxDgO74gBnmfyc'
        if (!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCb5CTQi5_vI_D8T3tlGhxDgO74gBnmfyc';
        }
        axios.post(url, authData)
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