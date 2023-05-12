const express = require('express');
const bodyParser = require('body-parser')
const generateRanNum = require('./modules/randomNum')
let guessArray = require('./modules/guessArray');
const botGuess = require('./modules/bot')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

app.get('/array', function (req, res) {
  console.log('Request for Array');
  res.send(guessArray)
})

let randomNum = 0;
let minGobal = 0;
let maxGobal = 0;

app.post('/array', function (req, res) {
  // console.log('Post array', req.body);
  let clientGuesses = req.body;
  clientGuesses.botGuess = botGuess( minGobal, maxGobal )
  console.log(clientGuesses.botGuess);
  
  if (clientGuesses.player1Guess == randomNum){
        clientGuesses.player1Result = 'WINNER!!!';
  }else if ( clientGuesses.player1Guess > randomNum){
        clientGuesses.player1Result = 'Too High';
  }else if (clientGuesses.player1Guess < randomNum ) {
         clientGuesses.player1Result = 'Too Low';
  }
  if (clientGuesses.player2Guess == randomNum ) {
        clientGuesses.player2Result = 'WINNER!!!';
  }else if ( clientGuesses.player2Guess > randomNum){
       clientGuesses.player2Result = 'Too High';
  }else if (clientGuesses.player2Guess < randomNum){
        clientGuesses.player2Result = 'Too Low';
  }

  if (clientGuesses.botGuess == randomNum ) {
    clientGuesses.botResult = 'WINNER!!!';
}else if ( clientGuesses.botGuess > randomNum){
   clientGuesses.botResult = 'Too High';
}else if (clientGuesses.botGuess < randomNum){
    clientGuesses.botResult = 'Too Low';
}

  if(clientGuesses.player1Guess == randomNum && clientGuesses.player2Guess == randomNum){
    clientGuesses.player1Result = 'YOU LOSE RESTART GAME';
    clientGuesses.player2Result = 'YOU LOSE RESTART GAME';
    clientGuesses.botResult = 'YOU LOSE RESTART GAME';
  }


  console.log(clientGuesses);
  
  guessArray.push(clientGuesses);

  res.sendStatus(201);
})



app.post('/random', function (req, res) {
const minmax = req.body
//   console.log((req.body.minValue), (req.body.maxValue));
//   console.log((minmax.min / 1), (minmax.max/ 1)  );

// console.log(minmax);
minGobal = (minmax.min / 1);
maxGobal =  (minmax.max / 1);

  randomNum = generateRanNum((minmax.min / 1), (minmax.max / 1));
  console.log(randomNum);
  res.sendStatus(201)
})

app.get('/restart', function (req, res) {
  guessArray = [];
  res.send(guessArray)
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)

})
