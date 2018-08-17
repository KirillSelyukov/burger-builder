import reducer from './auth';
import * as actionTypes from '../actions/actions';
describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
    it('should store token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
                type: actionTypes.AUTH_START_SUCCESS,
                token: 'sometoken',
                userId: 'someid'
            })).toEqual({
                token: 'sometoken',
                userId: 'someid',
                error: null,
                loading: false,
                authRedirectPath: '/'
            });
    })
});