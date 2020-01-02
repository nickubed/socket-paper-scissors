console.log('HELLOOOOOO World')
const socket = io();

let btn;
let login;
let username;

document.addEventListener('DOMContentLoaded', () => {
    btn = document.getElementById('btn').addEventListener('click', submitLogin)
    login = document.getElementById('login');
    username = document.getElementById('username');
})

const submitLogin = () => {
    console.log('What it do')
}
socket.on('get players', data => {
    console.log(data);
})