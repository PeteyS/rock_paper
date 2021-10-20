    let playerChoice = 3;
    let compChoice = 4;
    let count = 0;
    let playerScore = 0;
    let compScore = 0;

    const go = document.querySelector('#go');
    const finalResult = document.querySelector('#finalResult');
    const result = document.querySelector('#result');
    const choice = document.querySelector('#choice');
    const round = document.querySelector('#round');
    const control = document.querySelector('#controls');
    const restart = document.createElement('button');
    const computerWeapon = document.querySelector('#comp');
    const cScore = document.querySelector('#cScore');
    const pScore = document.querySelector('#pScore');

    restart.textContent = "Restart?" //this will be used to restart game 
    go.disabled = true;//disable go until they choose a weapon

    const btn = document.querySelector('#rock');
    btn.addEventListener('click', () => {
        playerChoice = 0;
        choice.textContent = 'Your Weapon: Rock';
        computerWeapon.textContent = "Computer Weapon: ";
        go.disabled = false;
    })

    const paper = document.querySelector('#paper');
    paper.addEventListener('click', () => {
        playerChoice = 1;
        choice.textContent = 'Your Weapon: Paper';
        computerWeapon.textContent = "Computer Weapon: ";
        go.disabled = false;
    })

    const scissors = document.querySelector('#scissors');
    scissors.addEventListener('click', () => {
        playerChoice = 2;
        choice.textContent = 'Your Weapon: Scissors';
        computerWeapon.textContent = "Computer Weapon: ";
        go.disabled = false;
    })

    go.addEventListener('click', () => { //go evals the round and the game
        go.disabled = true;
        
        count++;
        round.textContent = "Round: "+ count;

        computerPicks();
        let whoWonRound = whoWon(compChoice,playerChoice);
        tallyScore(whoWonRound);
        updateScore();
        let key = finalScore(count);
        replay(key);

    });

    restart.addEventListener('click', () => { //ungrey everything and clear labels then remove restart button
        rock.disabled = false;
        paper.disabled = false;
        scissors.disabled = false;
        go.disabled = false;
        finalResult.textContent = "";
        result.textContent = "And the round result is...";
        round.textContent = "Round:0";
        choice.textContent = "Your Weapon: ";
        computerWeapon.textContent = "Computer Weapon: "
        count =0;
        control.removeChild(restart);

    })

    function computerPicks(){ //computer chooses rock paper scissors
        compChoice = Math.floor(Math.random()*3);
        if (compChoice == 0){
            computerWeapon.textContent="Computer Weapon: Rock";
        }
        else if (compChoice ==1){
            computerWeapon.textContent="Computer Weapon: Paper";
        }
        else{
            computerWeapon.textContent="Computer Weapon: Scissors";
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
            playerScore+=2;
            result.textContent = "Player Wins Round";
        }
        else if(x==1){
            result.textContent = 'Draw';
        }
        else{
            compScore+=2;
            result.textContent = 'Computer Wins Round';
        }
    }
    function finalScore(x){
        if (x == 5){//if round count is 5 evaluate winner of game
            if (playerScore>compScore){
                finalResult.textContent = "Player Wins"
            }
            else if (compScore>playerScore){
                finalResult.textContent = "Computer Wins"
            }
            else{
                finalResult.textContent = "Draw"
            }
            return true;
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
            control.appendChild(restart);
        }
    }
    function updateScore(){
        pScore.textContent = `Your score: ${playerScore}`;
        cScore.textContent = `Computer Score: ${compScore}`;
    }