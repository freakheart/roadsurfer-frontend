import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_CHECK} from 'react-admin';
import jwtProvider from "./jwtProvider";

// eslint-disable-next-line import/no-anonymous-default-export
export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request(process.env.REACT_APP_API_ENTRYPOINT+'/authentication_token', {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(( token ) => {
                jwtProvider.setToken(token)
            });
    }
    if (type === AUTH_LOGOUT) {
        jwtProvider.ereaseToken()
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const status  = params.status;
        if (status === 401 || status === 403) {
            jwtProvider.ereaseToken()
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return jwtProvider.waitForTokenRefresh().then(() => {
            return jwtProvider.getToken() ? Promise.resolve() : Promise.reject();
        });
    }
    if (type === AUTH_GET_PERMISSIONS) {
        return jwtProvider.waitForTokenRefresh().then(() => {
            return jwtProvider.getToken() ? Promise.resolve() : Promise.reject();
        });
    }
    return Promise.reject('Unknown method');
}