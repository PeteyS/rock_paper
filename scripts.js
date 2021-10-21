let playerChoice = 0;//will use in game logic to eval winning and losing
let compChoice = 0; 
let count = 0;
let playerScore = 0;
let compScore = 0;

const go = document.querySelector('#go');
const finalResult = document.querySelector('#finalResult');
const result = document.querySelector('#result');
const choice = document.querySelector('#choice');
const round = document.querySelector('#round');
const control = document.querySelector('#controls');
const restart = document.querySelector('#restart');
const computerWeapon = document.querySelector('#comp');
const cScore = document.querySelector('#cScore');
const pScore = document.querySelector('#pScore');
const playerPic = document.querySelector('#playerPic');
const compPic = document.querySelector('#compPic');
const left = document.querySelector('#left');
const right = document.querySelector('#right');

go.disabled = true;//disable go until they choose a weapon
restart.disabled = true;

const btn = document.querySelector('#rock');
btn.addEventListener('click', () => {
    playerChoice = 0;
    choice.textContent = 'rock';
    playerPic.style.background = 'rgb(28, 28, 146)';
    compPic.style.background = 'rgb(28, 28, 146)';
    computerWeapon.textContent = "choosing";
    result.textContent = "...";
    go.disabled = false;
})

const paper = document.querySelector('#paper');
paper.addEventListener('click', () => {
    playerChoice = 1;
    choice.textContent = 'paper';
    playerPic.style.background = 'rgb(28, 28, 146)';
    compPic.style.background = 'rgb(28, 28, 146)';
    computerWeapon.textContent = "choosing";
    result.textContent = "...";
    go.disabled = false;
})

const scissors = document.querySelector('#scissors');
scissors.addEventListener('click', () => {
    playerChoice = 2;
    choice.textContent = 'scissors';
    playerPic.style.background = 'rgb(28, 28, 146)';
    compPic.style.background = 'rgb(28, 28, 146)';
    computerWeapon.textContent = "choosing";
    result.textContent = "...";
    go.disabled = false;
})

go.addEventListener('click', () => { //go evals the round and the game
    go.disabled = true;
    
    count++;
    round.textContent = "R:"+ count;

    computerPicks();
    let whoWonRound = whoWon(compChoice,playerChoice);
    tallyScore(whoWonRound);
    updateScore();
    let key = finalScore(count);
    replay(key);

});

restart.addEventListener('click', () => { //ungrey everything and clear labels then remove restart button
    left.style.background = 'tomato';
    right.style.background = 'tomato';
    playerPic.style.background = 'rgb(28, 28, 146)';
    compPic.style.background = 'rgb(28, 28, 146)';
    rock.disabled = false;
    paper.disabled = false;
    scissors.disabled = false;
    go.disabled = true;
    finalResult.textContent = "";
    result.textContent = "...";
    round.textContent = "R:0";
    choice.textContent = "choose";
    computerWeapon.textContent = "waiting"
    pScore.textContent = "Your Score:";
    cScore.textContent = 'Computer Score:';
    count =0;
    restart.disabled = true;

})

function computerPicks(){ //computer chooses rock paper scissors
    compChoice = Math.floor(Math.random()*3);
    if (compChoice == 0){
        computerWeapon.textContent="rock";
    }
    else if (compChoice ==1){
        computerWeapon.textContent="paper";
    }
    else{
        computerWeapon.textContent="scissors";
    }
}

function whoWon(comp,player){
    if (comp == 0){ //if comp has rock
        if(player == 0){ //if player has rock 
            return 1;//return 1 for draw
        }
        else if (player == 1){ //if player has paper 
            return 2;//return 2 for a player win
        }else{
            return 0;//return 0 for a player loss
        }
    }
    else if (comp ==1){ //if comp has paper
        if(player == 0){//player chose rock
            return 0;
        }
        else if (player == 1){//player chose paper
            return 1;
        }else{
            return 2;
        }
    }else{//comp has scissors
        if(player == 0){//player chose rock
            return 2;
        }
        else if (player == 1){//player chose paper
            return 0;
        }else{
            return 1;
        }
    }
}
function tallyScore(x){
    if (x==2){ //eval the round and give points
        playerScore+=1;
        result.textContent = "Player Wins Round";
        playerPic.style.background = 'green';
        compPic.style.background = 'red';

    }
    else if(x==1){
        result.textContent = 'Draw';
        playerPic.style.background = 'grey';
        compPic.style.background = 'grey';
    }
    else{
        compScore+=1;
        result.textContent = 'Computer Wins Round';
        playerPic.style.background = 'red';
        compPic.style.background = 'green';
    }
}
function finalScore(x){
    if (x == 5){//if round count is 5 evaluate winner of game
        if (playerScore>compScore){
            result.textContent = "";
            finalResult.textContent = "Player Wins";
            left.style.background = 'green';
            playerPic.style.background = 'green';
            right.style.background = 'red';
            compPic.style.background = 'red';
        }
        else if (compScore>playerScore){
            result.textContent = "";
            finalResult.textContent = "Computer Wins"
            left.style.background = 'red';
            playerPic.style.background = 'red';
            right.style.background = 'green';
            compPic.style.background = 'green';
        }
        else{
            result.textContent = "";
            finalResult.textContent = "Draw";
            left.style.background = 'grey';
            playerPic.style.background = 'grey';
            right.style.background = 'grey';
            compPic.style.background = 'grey';
        }
        playerScore = 0;
        compScore = 0;
        return true; //return a boolean for the replay function
    }
    else{
        return false;
    }
}
function replay(x){ //give player option to replay and grey everything out till they choose
    if (x == true){
        rock.disabled = true;
        paper.disabled = true;
        scissors.disabled = true;
        go.disabled = true;
        restart.disabled = false;
    }
}
function updateScore(){ 
    pScore.textContent = `Your score: ${playerScore}`;
    cScore.textContent = `Computer Score: ${compScore}`;
}