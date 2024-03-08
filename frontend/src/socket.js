import { io } from "socket.io-client";
let url="https://sketchboard-glsn.onrender.com"; // change it according to environment
export const socket = io(url); 