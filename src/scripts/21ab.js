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

function setUp21ab(){
  document.getElementById("adjustScore").classList.add("d-none");
  document.getElementById("PlayerNameNI").classList.add("d-none");

  document.getElementById('playerList').addEventListener('click', toggleRowSelectionEvent);
  document.getElementById('HeartPicture').addEventListener('click', toggleHeratPicture);
  document.getElementById('addPlayerBtn').addEventListener('click', () => {addPlayer(players)});
  document.getElementById('adjustPointsBtn').addEventListener('click', () => {adjustPoints(players, (mul) => {
    let isHeartRound = 1;
    if (document.getElementById('HeartPicture').name === 'heartX2Fill.svg') {
      isHeartRound = 2;
    }
    if (mul > 0) {
      return -1 * mul * isHeartRound;
    }
    else {
      return 5 * isHeartRound;
    }
  })});
  document.getElementById('startButton').addEventListener('click', () => {startGame(players)});
}
