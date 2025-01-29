function startGame() {
  // Hide the input form and start button
  document.getElementById("playerInput").classList.add("d-none");
  document.getElementById("startButton").classList.add("d-none");

  document.getElementById("adjustScore").classList.remove('d-none');
  document.getElementById("PlayerNameNI").classList.remove("d-none");
  toggleRowSelection('player0');
  setFocusToElementID('numberInput');
}

function toggleRowSelectionEvent(event) {
  let playerID = event.target.parentNode.id;
  console.log(playerID);
  toggleRowSelection(playerID);
}

function toggleHeratPicture(){
  let heartPicture = document.getElementById('HeartPicture')
  if (heartPicture.name === "heartX2.svg"){
    heartPicture.name = "heartX2Fill.svg";
    heartPicture.src = "src/resources/heartX2Fill.svg";
  }
  else{
    heartPicture.name = "heartX2.svg";
    heartPicture.src = "src/resources/heartX2.svg";
  }
  setFocusToElementID('numberInput');
}

function adjustPoints21ab(mul){
  let isHeartRound = 1;
  if (document.getElementById('HeartPicture').name === 'heartX2Fill.svg') {
    isHeartRound = 2;
  }
  if (mul != 0) {
    return -1 * mul * isHeartRound;
  }
  else {
    return 5 * isHeartRound;
  }
}

function endGame(players){
  let isEnding = false;

  let modalBody = ""
  players = Array.from(players.values()).sort((player1, player2) => player1.points - player2.points);
  let winningPlayer = "";

  for (let player of players){
    if (player.points === 0){
      isEnding = true;
      winningPlayer = player.name
    }

    modalBody += player.name + " - " + player.points +"\n";
    console.log(player.points);
    console.log(player.name);
    console.log("-------")
  }

  if (isEnding){
    document.getElementById('modalText').innerText = "Gewonnen hat: " + winningPlayer + "\n" + modalBody;
    let myModal = new bootstrap.Modal(document.getElementById('winModal'));
    myModal.show();
  }
}

function setUp21ab(){
  document.getElementById("adjustScore").classList.add("d-none");
  document.getElementById("PlayerNameNI").classList.add("d-none");

  document.getElementById('playerList').addEventListener('click', toggleRowSelectionEvent);
  document.getElementById('HeartPicture').addEventListener('click', toggleHeratPicture);
  document.getElementById('addPlayerBtn').addEventListener('click', () => {addPlayer(players)});
  document.getElementById('adjustPointsBtn').addEventListener('click', () => {adjustPoints(players, adjustPoints21ab, endGame)});
  document.getElementById('startButton').addEventListener('click', () => {startGame(players)});
}
