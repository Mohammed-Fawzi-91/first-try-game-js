function yes(yourChoice) {
    var humanChoice, botChoice;

    humanChoice = yourChoice.id;

    botChoice = numberToChoice(randToRpsInt());

    result = decideWinner(humanChoice, botChoice);

    message = finalMessage(result);

    rpsFrontEnd(yourChoice.id, botChoice, message);


}

function randToRpsInt() {

    return Math.floor(Math.random() * 3);

}

function numberToChoice(number) {
    return ['rock', 'pap', 'sis'][number];

}


function decideWinner(yourChoice, computerChoice) {
    var rpsDataBase = {
        'rock': { 'sis': 1, 'rock': 0.5, 'pap': 0 },
        'pap': { 'rock': 1, 'pap': 0.5, 'sis': 0 },
        'sis': { 'pap': 1, 'sis': 0.5, 'rock': 0 }
    };
    var yourScore = rpsDataBase[yourChoice][computerChoice];
    var computerScore = rpsDataBase[computerChoice][yourChoice];
    return [yourScore, computerScore];








}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return { 'message': 'you suck', 'color': 'red' };

    } else if (yourScore === 0.5) {
        return { 'message': 'try again BABY', 'color': 'yellow' };
    } else {
        return { 'message': 'you won bitch', 'color': 'green' };
    }
}


function rpsFrontEnd(humanImg, botImg, finalMessage) {

    var imgDataBase = {
        'rock': document.getElementById('rock').src,
        'pap': document.getElementById('pap').src,
        'sis': document.getElementById('sis').src
    }

    document.getElementById('rock').remove();
    document.getElementById('pap').remove();
    document.getElementById('sis').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imgDataBase[humanImg] + "' height= 150px width =200px >"
    messageDiv.innerHTML = "<h1 style= 'color:" + finalMessage['color'] + "; font-size:60px; padding : 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imgDataBase[botImg] + "' height= 150px width =200px >"



    document.getElementById('flex_box_2').appendChild(humanDiv);
    document.getElementById('flex_box_2').appendChild(messageDiv);
    document.getElementById('flex_box_2').appendChild(botDiv);

}


//change the colors:::

let allButtons = document.getElementsByTagName('button');

let copyAllButtons = [];
for (let i = 0; i < allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1]);
}
console.log(copyAllButtons);



function colorChange(titi) {

    if (titi.value === 'red') {
        buttonsRed();
    }
    else if (titi.value === 'green') {
        buttonsGreen();
    }
    else if (titi.value === 'reseat') {
        buttonsReset();
    }
    else if (titi.value === 'random') {
        buttonsRandom();
    }
}
function buttonsRed() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');

    }


}

function buttonsGreen() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-sucsess');

    }


}

function buttonsReset() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);

    }


}

function buttonsRandom() {
    let choises = ["btn-primary", "btn-danger", "btn-warning", "btn-sucsess"]
    for (let i = 0; i < allButtons.length; i++) {
        let randomNomber = Math.floor(Math.random() * 4)
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choises[randomNomber]);

    }

}


//next challeng 



let blackJackGame = {
    'you': { 'scorSpan': '#your-black-jack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scorSpan': '#dealer-black-jack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'K': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'drwas': 0,
    'stand': false,
    'turnsOver': false,


};



const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');








document.querySelector('#black-jack-hit-button').addEventListener('click', blackjackhit);
document.querySelector('#black-jack-del-button').addEventListener('click', blackJackDeal);
document.querySelector('#black-jack-stand-button').addEventListener('click', dealerLogic);


function blackjackhit() {
    if (blackJackGame['stand'] === false) {

        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }

}
function randomCard() {

    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex];
}




function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {

        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}


function blackJackDeal() {

    if (blackJackGame['turnsOver'] === true) {


        blackJackGame['stand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');

        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-black-jack-result').textContent = 0;
        document.querySelector('#dealer-black-jack-result').textContent = 0;
        document.querySelector('#your-black-jack-result').style.color = 'white';
        document.querySelector('#dealer-black-jack-result').style.color = 'white';

        document.querySelector('#black-jack-result').textContent = 'lets play';

        document.querySelector('#black-jack-result').style.color = 'black';

    }
}







function updateScore(card, activePlayer) {

    if (card === 'A') {
        if (activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
}


function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scorSpan']).textContent = 'Fucked';
        document.querySelector(activePlayer['scorSpan']).style.color = 'red';

    } else { document.querySelector(activePlayer['scorSpan']).textContent = activePlayer['score']; }
}
function sleep(ms){
    return new Promise( resolve => setTimeout(resolve,ms));
}


async function dealerLogic() {
    blackJackGame['stand'] = true;
    while (DEALER['score'] < 16 && blackJackGame['stand'] === true) {

        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep (800);
    }


        
            blackJackGame['turnsOver'] = true;
            let winner = cumputeWinner();
            showResult(winner);
        }



    

    function cumputeWinner() {
        let winner;
        if (YOU['score'] <= 21) {

            if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
                blackJackGame['wins']++;
                winner = YOU

            }
            else if (YOU['score'] < DEALER['score']) {
                blackJackGame['losses']++;

                winner = DEALER
            }
            else if (YOU['score'] === DEALER['score']) {
                blackJackGame['drwas']++;


            }
        }
        else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
            blackJackGame['losses']++;
            winner = DEALER

        }
        else if (YOU['score'] > 21 && DEALER['score'] > 21) {
            blackJackGame['drwas']++;


        }
        return winner
    }

    function showResult(winner) {

        let message, messagecolor;
        if (blackJackGame['turnsOver'] === true) {

            if (winner === YOU) {
                document.querySelector('#wins').textContent = blackJackGame['wins'];

                message = 'I HATE JULA KAKE';
                messagecolor = 'green';
                winSound.play();
            }
            else if (winner === DEALER) {
                document.querySelector('#losses').textContent = blackJackGame['losses'];

                message = 'IDA WON ';
                messagecolor = 'red';
                lossSound.play();
            }
            else {
                document.querySelector('#drow').textContent = blackJackGame['drwas'];

                message = 'LETS TRY AGAIN BABY';
                messagecolor = 'black';

            }
            document.querySelector('#black-jack-result').textContent = message;
            document.querySelector('#black-jack-result').style.color = messagecolor;


        }
    }




    





