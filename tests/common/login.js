import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { sleep, check } from 'k6';

const headers = JSON.parse(open('../helpers/loginHeaders.json'))

const users = new SharedArray('users', function () {
  return JSON.parse(open('../helpers/credentials.json'));
});

export function login() {
    const userCredentials = users[__VU % users.length]
    const url = 'http://localhost:3000/auth/login';
    const payload = JSON.stringify(userCredentials)
    let res = http.post(url, payload, headers);

    check(res, {
        'is /auth/login status 200': (r) => r.status === 200,
    });
    sleep(1);
    return res
} 