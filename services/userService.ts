import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'

import axios from 'axios';

const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.apiUrl;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout
};

function login(email, password) {
    return axios.post(`${baseUrl}/login`, { email, password })
        .then(user => {
            if(user.data.data != null) {
                userSubject.next(user.data.data);
                localStorage.setItem('user', JSON.stringify(user.data.data));
            }
            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    localStorage.removeItem('cartData');
    //userSubject.next(null);
    window.location.href = "/login";
}
