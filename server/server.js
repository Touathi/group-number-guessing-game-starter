const express = require('express');
const bodyParser = require('body-parser')
// const generateRanNum = require('./modules/randomNum')
let guessArray = require('./modules/guessArray');
// const randomNum = require('./modules/randomNum');
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
  


app.post('/array', function (req, res) {
  // console.log('Post array', req.body);
  let clientGuesses = req.body;

  
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
  if(clientGuesses.player1Guess == randomNum && clientGuesses.player2Guess == randomNum){
    clientGuesses.player1Result = 'YOU LOSE RESTART GAME';
    clientGuesses.player2Result = 'YOU LOSE RESTART GAME';
  }


  console.log(clientGuesses);
  
  guessArray.push(clientGuesses);

  res.sendStatus(201);
})



app.get('/random', function (req, res) {
  randomNum = generateRanNum();
  console.log(randomNum);
  res.sendStatus(201)
})

app.get('/restart', function (req, res) {
  guessArray = [];
  res.sendStatus(201);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)

})


function generateRanNum() {
  // 1 = Math.ceil(1);
  // 25 = Math.floor(25);
  return Math.floor(Math.random() * (25 - 1 + 1)) + 1;
}
