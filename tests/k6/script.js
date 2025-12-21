import http from 'k6/http';
import { Trend } from 'k6/metrics';
import { sleep, check, group } from 'k6';
import { login } from '../common/login.js';
import faker from 'k6/x/faker';

const fantasyTitle = `${faker.word.adjective()} ${faker.animal.animal()}`

const serverWaitingTimeOnLogin = new Trend('serverWaitingTimeOnLogin')
const BASE_URL = __ENV.LOCAL || 'http://localhost:3000'

export const options = {
  stages: [
    { duration: '5s', target: 5 }, // Ramp up to 5 VUs over 1 sec
    { duration: '5s', target: 10 }, // Stay at 5 VUs for 5 sec (constant load)
    { duration: '5s', target: 0 }, // Ramp down to 0 VUs over 1 sec
  ],
  thresholds: {
    http_req_duration: ['p(90)<=30', 'p(95)<30'],
    http_req_failed: ['rate<0.01']
  }
};

export default function () {
  const loginRes = login()
  const loginToken = loginRes.json('token')

  group('endpoint 1', function () {
    let res = http.get(`${BASE_URL}/games`, {
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${loginToken}`
      },
    });

    check(res, {
      'is GET /games status 200': (r) => r.status === 200,
    });

    serverWaitingTimeOnLogin.add(loginRes.timings.waiting)
    sleep(1);
  })

  group('endpoint 2', function () {
    let put = http.put(`${BASE_URL}/games`,
      JSON.stringify({
        id: 2,
        title: `k6 ${fantasyTitle}`,
        year: 2025,
        date: "2025-12-18T00:05:45.919Z"
      }),
      {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${loginToken}`,
          'Content-Type': 'application/json'
        },
      }
    );
    check(put, {
      'is PUT /games status 200': (r) => r.status === 200,
    });
  })
}
