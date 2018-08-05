import * as actionTypes from '../actions/actions';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}
const authStartSuccess = (state, action) => {
    return updateObject(state, { token: action.idToken, userId: action.userId, error: null, loading: false });
}
const authStartFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_START_FAIL: return authStartFail(state, action);
        case actionTypes.AUTH_START_SUCCESS: return authStartSuccess(state, action);
        default: return state;
    }
}

export default reducer;