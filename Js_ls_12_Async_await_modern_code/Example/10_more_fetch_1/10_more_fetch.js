'use strict';

/* Метод POST */
async function main() {
  const resp = await fetch('https://dummyjson.com/auth/login',{
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    /* Зайдем на https://dummyjson.com/docs/auth и глянем рекомендации: */
    body: JSON.stringify({
      username: 'emilys',
      password: 'emilyspass'
    })
  });
  const data = await resp.json();
  console.log(data);
}

main();
/*
В ответ прилетел:

{accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwid…IzMX0.wfcNJbwl2woGtqK-hoznDUwdpfwAl_QmC2hPRcMYjeY', 
refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwid…YzMX0.x_74tdBjTVA6iPlZ9S-BCznua4JUzpdI-YDMPiLA4jE', 
id: 1, username: 'emilys', email: 'emily.johnson@x.dummyjson.com',…}
*/