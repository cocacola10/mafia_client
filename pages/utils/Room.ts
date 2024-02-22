const Mutex = require('async-mutex').Mutex;
const mutex = new Mutex();

let room: number = -1;
let su: boolean = false;

export function getRoom(): number {
    return room;
}

export async function setRoom(num: number){
    await mutex.acquire();
    try {
        room = num;
    } finally {
        mutex.release();
    }
}