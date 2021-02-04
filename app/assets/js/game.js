// Elements 
const charactersListP1 = document.querySelectorAll('.player_1');
const charactersListP2 = document.querySelectorAll('.player_2');
const readyButtons = document.querySelectorAll('#ready');
const gameTitle = document.querySelector('#title'); 
const gameLockers = document.querySelectorAll('#square');
const scoreP1 = document.querySelector('.p1');
const scoreP2 = document.querySelector('.p2');

//  Vars
let characterP1; 
let characterP2;
let readyP1; 
let readyP2;
let playboard = []; 
let p1Count = 0;  
let p2Count = 0;
let turn = 0;

// Listeners
window.onload = () => {
    scoreP1.textContent = 0;  
    scoreP2.textContent = 0;  
}
charactersListP1.forEach(e => e.addEventListener('click', selectCharacter) );
charactersListP2.forEach(e => e.addEventListener('click', selectCharacter) );
readyButtons.forEach(e => e.addEventListener('click', ready4Play) );

// functions
function changeSelected(list, color, element) {
    for(let i = 0; i < list.length; i++) {
        if(charactersListP1[i].classList.contains(`selected-${color}`)) {
            charactersListP1[i].classList.remove(`selected-${color}`);
        }
    }
    
    element.target.classList.add(`selected-${color}`);
    return element.target.classList; 
}


function selectCharacter(e) {
    let selectedClassList;

    if(e.target.dataset.id === "1") {
        selectedClassList = changeSelected(charactersListP1, 'blue', e);
        characterP1 = `${selectedClassList[1]} ${selectedClassList[2]}`;
    } else if (e.target.dataset.id === "2") {
        selectedClassList = changeSelected(charactersListP2, 'red', e); 
        characterP2 = `${selectedClassList[1]} ${selectedClassList[2]}`;
    }
}

function ready4Play(e) {
    if(e.target.dataset.ready === "p1") {
        if(!characterP1 || characterP1 === '')  {
            return alert('Please before select a character!'); 
        }
        readyP1 = true;
        e.target.textContent = "Player ready!";
    } else if(e.target.dataset.ready === "p2") {
        if(!characterP2 || characterP2 === '')  {
            return alert('Please before select a character!'); 
        }
        readyP2 = true;
        e.target.textContent = "Player ready!";
    }


    if(readyP1 && readyP2) {
        gameTitle.textContent = 'Start!';
        play();
    }
}

function play() {
    let result;
    gameLockers.forEach((e, i) => e.addEventListener('click', () => {
        if(turn % 2 == 0) {
            gameLockers[i].innerHTML = `<div class="m-auto text-center"><i class="selected-square player_1 ${characterP1}"></i></div>`;
            gameLockers[i].style.backgroundColor = '#5f53c47e'; 
            playboard[i] = 'P1';
            result = someoneWin('P1');
        } else {
            gameLockers[i].innerHTML = `<div class="m-auto text-center"><i class="selected-square player_2 ${characterP2}"></i></div>`;
            gameLockers[i].style.backgroundColor = '#e66673af'; 
            playboard[i] = 'P2';
            result = someoneWin('P2');
        }

        turn ++;

        if(result.win) {
            setTimeout(() => {
                if(result.player == 'P1') {
                scoreP1.textContent = p1Count + 1; 
                    
                    alert('Player 1 Wins!');
                    } else {
                        scoreP2.textContent = p2Count + 1; 
                        alert('Player 2Wins!');
                    }
                    readyP1 = null;
                    readyP2 = null;
                    characterP1 = null;
                    characterP2 = null;
                    gameLockers.forEach(e => {
                        e.innerHTML = ''
                        e.style.backgroundColor = 'inherit';
                    });
            }, 550);
        }
    })); 
    
}   

function someoneWin(player) {
    if (playboard[0] === player && playboard[1] == player && player === playboard[2]) {
        return {win: true, player};
    }
    else if (playboard[3] === player && playboard[4] == player && player === playboard[5]) {
        return {win: true, player};
    } 
    else if (playboard[6] === player && playboard[7] == player && player === playboard[8]) {
        return {win: true, player};
    } 
    else if (playboard[0] === player && playboard[3] == player && player === playboard[6]) {
        return {win: true, player};
    } 
    else if (playboard[1] === player && playboard[4] == player && player === playboard[7]) {
        return {win: true, player};
    } 
    else if (playboard[2] === player && playboard[5] == player && player === playboard[8]) {
        return {win: true, player};
    } 
    else if (playboard[0] === player && playboard[4] == player && player === playboard[8]) {
        return {win: true, player};
    } 
    else if (playboard[2] === player && playboard[4] == player && player === playboard[6]) {
        return {win: true, player};
    } 
    
    return false;
}