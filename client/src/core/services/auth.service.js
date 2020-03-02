import Dialog from './dialog/DialogService';
import Login from '../dialogs/auth/login.dialog';
import Register from '../dialogs/auth/register.dialog';
import api from '../../core/servers/api';
import {handle, waiting } from '../services/http';

export const TOKEN_LOCATION = 'bearer-token';

export async function login() {
    const { register, accessToken } = await Dialog.show(Login, {send});
    return register ? signup() : saveToken(accessToken);

    function send(data) {
        return handle(waiting(api.post('auth/login', data))); 
    }
}

export async function signup() {
    const { signIn, accessToken } = await Dialog.show(Register, {send});
    return signIn? login(): saveToken(accessToken);

    function send(data) {
        return handle(waiting(api.post('auth/register', data))); 
    }
}

function saveToken(accessToken) {
    localStorage.setItem(TOKEN_LOCATION, accessToken);
    return accessToken;
}

export function getToken() {
    return localStorage.getItem(TOKEN_LOCATION);
}

export function isLoggedIn() {
    return !!getToken();
}

export function logout() {
    return Promise.resolve(localStorage.removeItem(TOKEN_LOCATION));
}