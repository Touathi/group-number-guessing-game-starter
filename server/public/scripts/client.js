$(document).ready(handleReady);

function handleReady() {
  console.log("Page is ready to run")
    getArray()
    $('#playerinputs').on('submit', addGuesses)
    $('#startBtn').on('click', startGame);
    $('#winnerContainer').on('click', restartGame);

}


function renderToDOM(guessArray) {
  $('#guessResults').empty()

  for (let guess of guessArray) {
    console.log(guess);
    $('#guessResults').append(`
      <tr>
          <td> ${guess.player1Name}</td>
          <td> ${guess.player1Guess}</td>
          <td>${guess.player1Result}</td>
          <td> ${guess.player2Name}</td>
          <td> ${guess.player2Guess}</td>
          <td> ${guess.player2Result}</td>
      </tr>
    `)
    
        if (guess.player1Result === 'WINNER!!!'){
          $('#winnerContainer').append(`
            <p id="p1Win">${guess.player1Name} YOU WIN </p>
            <button id="restartBtn">RESTART</button>
          `)
      }else if (guess.player2Result === 'WINNER!!!'){
        $('#winnerContainer').append(`
          <p id="p2Win">${guess.player2Name} YOU WIN </p>
          <button id="restartBtn">RESTART</button>
        `)
      }
      
      if (guess.player1Result && guess.player2Result === 'YOU LOSE RESTART GAME'){
        // $('#winnerContainer').empty();
        $('#winnerContainer').append(`
            <p id="youLose">YOU LOSE</p>
            <button id="restartBtn">RESTART</button>
          `)
      }
    
      $('#rndNum').text(`${guess.roundNumber}`);
    }
}
function startGame() {
  $.ajax({
    method: 'GET',
    url: '/random'
  }).then(function (response) {
    console.log('Get random number', response);
  }).catch(function (err) {
    alert('Error with array!')
    console.log('Request Failed : ', err);
  })
}

function getArray() {
  $.ajax({
    method: 'get',
    url: '/array'
  }).then(function (respond) {
    console.log('Got array');
    renderToDOM(respond)
  }).catch(function (err) {
    alert('Error with array!')
    console.log('Request Failed : ', err);
  })
}
let roundNumber = 0;
function addGuesses(event){

    roundNumber ++;

    event.preventDefault();

    const player1Name = $("#player1Name").val();
    const player1Guess = ($('#player1Guess').val())/1 ;
    const player2Name = $("#player2Name").val();
    const player2Guess = ($('#player2Guess').val())/1;
  
    // console.log(player1Name, player1Guess, player2Name, player2Guess);

    $.ajax({
        method: 'POST',
        url: '/array',
        data:{
          player1Name: player1Name,
          player1Guess: player1Guess,
          player1Result: '',
          player2Name: player2Name,
          player2Guess: player2Guess,
          player2Result: '',
          roundNumber: roundNumber
        }
    }).then(function (response){
      console.log('success');
    }).catch(function (err){
      alert('Error with array!');
      console.log('Request Failed:', err);
    })
    $('#player1Name').val('');
    $('#player1Guess').val('');
    $('#player2Name').val('');
    $('#player2Guess').val('');
   
    getArray();
}

function restartGame() {
  $.ajax({
    method: 'get',
    url: '/restart'
  }).then(function (respond) {
    console.log('RESTARTING');
    renderToDOM(respond)
  }).catch(function (err) {
    alert('Error with array!')
    console.log('Request Failed : ', err);
  })
  getArray();
  $('#winnerContainer').empty();
  roundNumber = 0;
}


// console"Page is loaded!");