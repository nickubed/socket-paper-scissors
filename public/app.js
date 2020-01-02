console.log('HELLOOOOOO World')
const socket = io();

let btn;
let choices = [];
let game;
let login;
let username;

document.addEventListener('DOMContentLoaded', () => {
    btn = document.getElementById('btn').addEventListener('click', submitLogin)
    choices = document.querySelectorAll('.game-choice')
    // choices.forEach(choice => {
    //     choice.addEventListener('click', submitChoice)
    // })
    game = document.getElementById('game');
    login = document.getElementById('login');
    username = document.getElementById('username');
})

const submitLogin = () => {
    socket.emit('add player', username.value, data => {
        if (data) {
            login.style.display = 'none'
            game.style.display = 'flex'
        }
        else {
            alert(`${username.value} is already in use!`)
        }
    })
}
socket.on('get players', data => {
    console.log(data);
})