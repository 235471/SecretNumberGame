let drawnNumbers = [];
let limitNumber = 200;
let secretNumber = randomSecretNumber(1, limitNumber);
let guesses = 1;
// Function to compare if the input number is the secret number and give tips so the user can discover the number.
function checkGuess() {
   let guess = Math.floor(document.querySelector('input').value);
   if(secretNumber == guess) {
        modifyHtml('h1', 'Parabéns você acertou!!')
        let tries = guesses > 1 ? 'tentativas' : "tentativa";
        let winnerMessage = `Você descobriu o número secreto em ${guesses} ${tries}`;
        modifyHtml('p', winnerMessage);
        // Enabling new game button on the page.
        document.getElementById('reiniciar').removeAttribute('disabled');
   }    
   else {
        if(guess > secretNumber) {
            modifyHtml('p', 'O número secreto é menor');           
        }
        else {
            modifyHtml('p', 'O número secreto é maior');
        }
        guesses++;
        clearInput()
   }
}
// Function to change html values using js
function modifyHtml(tag, valor) {
    let campo = document.querySelector(tag);
    campo.innerHTML = valor;
    // Script in line 7 of html file to be able to use this variation , worked on desktop but not on mobile
    //responsiveVoice.speak(valor, 'Brazilian Portuguese Female', {rate:1.2});

    //Native js instead
    if ('speechSynthesis' in window) {        
        let utterance = new SpeechSynthesisUtterance(valor);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
        console.log('here');
    }
    else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
// Function that generates a random number for our game using Math.floor instead of parseInt because is faster
function randomSecretNumber(min, max) {
    let drawnNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if(drawnNumbers.includes(drawnNumber)) {
        // Recursive in case the number was already drawn
        return randomSecretNumber(1, limitNumber);
    }
    else {
        // Adding the drawn number to the array
        drawnNumbers.push(drawnNumber);
        return drawnNumber;
    }
}
// Clearing the input field
function clearInput() {
    guess = document.querySelector('input');
    guess.value = '';
}
// After a win start a new game
function newGame() {
    secretNumber = randomSecretNumber(1, limitNumber);
    clearInput();
    guesses = 1;    
    initialMessage();
    // Adding attribute to make the new game button disabled whenever starting after winning
    document.getElementById('reiniciar').setAttribute('disabled', true);
    // Don't allow the previous 10 numbers to be drawn in the next game then clear after
    if(drawnNumbers.length > 10) {
        drawnNumbers = [];
    }
}

function initialMessage() {
    // Modifying some html tags
    modifyHtml('h1', 'Adivinhe o número');
    modifyHtml('p', `Escolha um número entre 1 e ${limitNumber}`);
}

initialMessage();