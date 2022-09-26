import http from 'k6/http';
import {thresholds, check, sleep } from 'k6';
// import {  } from "k6/martics";
export const options = {
  stages: [
    { duration: '30s', target: 200 }, //simulate ramp-up of traffic from 1 to 200 users over 30s
    { duration: '1m30s', target: 200 }, //stay at 200 users fro 1m30s
    { duration: '20s', target: 0 }, //ramp-down to 0
  ],
  thresholds: {
    http_req_duration: ['p(99)<150'], //99% request must complete below 150ms
    // http_req_errors: ['rate<0.1'],
    // http_req_errors{custom-tag:hola}: ['rate<0.2']
  }
}
export default function () {
  const res = http.get('http://208.209.0.141:1922/ords/ess/hr/employees/4498');
  check(res, {'status was 200': (r)=> r.status == 200})
  sleep(1);
}