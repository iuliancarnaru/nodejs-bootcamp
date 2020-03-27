const fs = require('fs');
const crypto = require('crypto');
process.env.UV_THREADPOOL_SIZE = 4; // default 4

const start = Date.now();

setTimeout(() => console.log(`timer 1 finished`), 0);
setImmediate(() => console.log(`immediate 1 finished`));

fs.readFile('./test-file.txt', 'utf-8', () => {
  console.log(`I/O finished`);
  console.log('-----------------');

  setTimeout(() => console.log(`timer 2 finished`), 0);
  setTimeout(() => console.log(`timer 3 finished`), 3000);
  setImmediate(() => console.log(`immediate 2 finished`));

  process.nextTick(() => console.log(`process nextTick`));

  // not going to threadpool (not handeled by eventloop)
  crypto.pbkdf2Sync('password1', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'password1 encrypted');

  // callbacks are handeled by event loop
  crypto.pbkdf2('password1', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password1 encrypted');
  });
  crypto.pbkdf2('password2', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password2 encrypted');
  });
  crypto.pbkdf2('password3', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password3 encrypted');
  });
  crypto.pbkdf2('password4', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password4 encrypted');
  });
});

console.log(`top level code`);

/* 

process.env.UV_THREADPOOL_SIZE = 1

top level code
timer 1 finished
immediate 1 finished
I/O finished
-----------------
1113 password1 encrypted
process nextTick
immediate 2 finished
timer 2 finished
2877 password1 encrypted
2921 password4 encrypted
2923 password2 encrypted
2933 password3 encrypted
timer 3 finished


process.env.UV_THREADPOOL_SIZE = 4

top level code
timer 1 finished
immediate 1 finished
I/O finished
-----------------
1164 password1 encrypted
process nextTick
immediate 2 finished
timer 2 finished
2882 password1 encrypted
2888 password2 encrypted
2993 password4 encrypted
3017 password3 encrypted
timer 3 finished

*/
