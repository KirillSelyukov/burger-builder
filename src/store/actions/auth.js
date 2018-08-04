import * as actionTypes from '../../store/actions/actions';

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
    }
}