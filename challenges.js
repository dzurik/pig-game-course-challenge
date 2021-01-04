/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

init();

var scores, roundScore, activePlayer, gamePlaying, lastDice;

document.querySelector('.btn-roll') .addEventListener('click', function(){// eventListener két attributuma van, Első mire történjen, második function 
    // anonymous function - nincs deklarálva kivül, ezért csak itt müködik
    if (gamePlaying){
    // 1. random number
        var dice = Math.floor(Math.random()*6)+1;

        //2.display the results
        var diceDOM = document.querySelector('.dice');

        diceDOM.style.display = 'block';
            diceDOM.src = 'dice-'+ dice + '.png';

        //3.update the score IF the rolled number is NOT 1

        if (dice === 6 && lastDice === 6){
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();

        } else if (dice !== 1){
            //add score
            roundScore += dice; // roundScore = roundScore + dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
            
        }  lastDice = dice;
      
    }
    
}); 


document.querySelector('.btn-hold') .addEventListener('click', function(){
    if (gamePlaying){
                // add current score to global score
        //score[activePlayer] += roundScore;
        scores[activePlayer] = scores[activePlayer] + roundScore;

        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if (scores[activePlayer] >= 10){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else{
            nextPlayer();
        }
    }
});

function nextPlayer(){

    //next player
        //activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; egyszerűbb
        if( activePlayer === 0){
            activePlayer = 1;
        } else {
            activePlayer = 0;
        } 

        roundScore = 0;

        document.getElementById('current-0').textContent = '0'; 
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');

        document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){

scores = [0,0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;

document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

document.querySelector('.dice').style.display = 'none'; // css módisítás
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}