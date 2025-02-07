
document.querySelector('.js-rock-btn').addEventListener('click', () => {
    playGame('rock'); 
})
document.querySelector('.js-paper-btn').addEventListener('click', () => {
    playGame('paper'); 
})
document.querySelector('.js-scissors-btn').addEventListener('click', () => {
    playGame('scissors'); 
})
document.querySelector('.js-reset-btn').addEventListener('click', () => {
    showResetConfirmation();
})
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace'){ 
        showResetConfirmation(); 
        
    }
})


document.querySelector('.js-autoplay-btn').addEventListener('click', () => {
    autoplay(); 
})
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a'){     
        autoplay();
    } 
})




document.body.addEventListener( 'keydown' , (event) => {
    if (event.key === 'r'){
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's'){
        playGame('scissors');
    }
}) 



function showResetConfirmation (){
    document.querySelector('.js-reset-confirmation').innerHTML =
    ` Are you sure? you want to reset score? 
    <button class= "js-confirm-yes confirmation-btn" >
    Yes </button>
    <button class = "js-confirm-no confirmation-btn" >
    No </button> `
    
    
    document.querySelector('.js-confirm-yes').addEventListener('click' , () => {
        reset();
        localStorage.removeItem('score');
        updateScoreElement();
        removeResetConfirmation();
    })
    
    document.querySelector('.js-confirm-no').addEventListener('click' , ()=> {
        removeResetConfirmation();
    })
}

function removeResetConfirmation (){
    document.querySelector('.js-reset-confirmation').innerHTML = '';
}

let computerMove = runComputerCode();
let result = ''
let playersMove = ''

let score =  JSON.parse((localStorage.getItem('score')))

if (score === null) {
    score = {
        wins : 0,
        loss : 0,
            ties : 0,
          }
        }
        
        updateScoreElement()
        
        function playGame (playersMove){
            let computerMove =  runComputerCode();  

            if (playersMove === 'scissors'){
                if (computerMove === 'rock') {
                    result = 'You lose.'
                }
                else if (computerMove === 'paper') {
                    result = 'You win.'
                }
        else if (computerMove === 'scissors') {
            result = 'Tie.'
        }

        
    }  
    else if (playersMove === 'paper'){
        if (computerMove === 'rock') {
            result = 'You win.'
        }
        else if (computerMove === 'paper') {
            result = 'Tie.'
        }
        else if (computerMove === 'scissors') {
            result = 'You lose.'
        }
    } 
        else if (playersMove === 'rock'){
            if (computerMove === 'rock') {
                result = 'Tie.'
            }
            else if (computerMove === 'paper') {
                result = 'You lose.'
            }
            else if (computerMove === 'scissors') {
                result = 'You win.'
            }
        }
        
        if (result === 'You win.'){
            score.wins += 1
        } else if (result === 'You lose.'){
            score.loss += 1
         } else if (result === 'Tie.'){
                score.ties += 1
            }

         localStorage.setItem('score' , JSON.stringify(score))
         document.querySelector('.js-description').
          innerHTML = ` you 
          <img class="move-icon" src="images/${playersMove}-emoji.png" >  
      <img class="move-icon" src="images/${computerMove}-emoji.png" >
    computer` 
         
         updateResultElement();
         updateDescriptionElement();
         updateScoreElement();
         
         
        //   alert(`You picked ${playersMove}. Computer picked ${computerMove}. ${result} 
        //  wins: ${score.wins}, losses: ${score.loss}, ties: ${score.ties}`)
         
        
    }
    function updateScoreElement (){
        document.querySelector('.js-score').
        innerHTML = `wins: ${score.wins}, losses: ${score.loss}, ties: ${score.ties}`;
    }
    function updateDescriptionElement (){
        
    }
        function updateResultElement (){
            document.querySelector('.js-result').
              innerHTML = `${result}`;
        }

        
        
        
        
        
        
        function reset (){
            score.wins = 0;
            score.loss = 0;
            score.ties = 0;
        }


        function runComputerCode() {
            const randomNumber = Math.random();
            let computerMove = ''
            
            if (randomNumber >= 0 && randomNumber <= 1 / 3) {
                computerMove = 'rock'
            }
            else if (randomNumber > 1 / 3 && randomNumber < 2 / 3) {
                computerMove = 'paper'
            }
            else if (randomNumber > 2 / 3 && randomNumber < 1) {
                computerMove = 'scissors'
            }


            return computerMove;
        }
        
        let isAutoplaying = false;
        let intervalId ;
        function autoplay (){

            if (!isAutoplaying){
           intervalId = setInterval( function (){
                    const playersMove = runComputerCode();
                    playGame(playersMove);
                }, 1000)
                isAutoplaying = true;
                document.querySelector('.js-autoplay-btn').innerHTML = 'Stop Play'
            } else {
                clearInterval(intervalId);
                isAutoplaying = false;
                document.querySelector('.js-autoplay-btn').innerHTML = 'Auto Play'
            }

           
        }