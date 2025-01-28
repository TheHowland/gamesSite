function addPlayer(players) {
  let listView = document.getElementById("playerList");
  let count = players.size;
  let input = document.getElementById("playerNameInput");
  let playerName = input.value.trim();
  input.value = "";

  if (playerName) {
    let playerTag = "player" + count.toString();
    let listElm = document.createElement("li");

    players.set(playerTag, new Player(playerName, playerTag));

    let playerRow = document.createElement("div");
    playerRow.className = "row";
    playerRow.id = playerTag;

    let playerNameField = document.createElement('div');
    playerNameField.className = "col-8 col-md-6";
    playerNameField.id = playerTag + " - name";
    playerNameField.innerText = playerName;

    let playerPointsField = document.createElement("div");
    playerPointsField.className = "col-4 col-md-3"
    playerPointsField.id = playerTag + " - points";
    playerPointsField.innerText = "21";

    playerRow.appendChild(playerNameField);
    playerRow.appendChild(playerPointsField);

    listElm.className = "dropdown-item";
    listElm.id = playerTag;

    listView.appendChild(playerRow);
    setFocusToElementID('playerNameInput');
  }
}

function startGame() {
  // Hide the input form and start button
  document.getElementById("playerInput").classList.add("d-none");
  document.getElementById("startButton").classList.add("d-none");

  document.getElementById("adjustScore").classList.remove('d-none');
  document.getElementById("PlayerNameNI").classList.remove("d-none");
  toggleRowSelection('player0');
  setFocusToElementID('numberInput');
}

function resetBackgroundColor(){
  let selected = document.getElementById("playerList").querySelector('.selected');
  if (selected){
    selected.classList.remove('bg-secondary');
    selected.classList.remove('selected');
  }
}

function toggleRowSelectionEvent(event) {
  let playerID = event.target.parentNode.id;
  console.log(playerID)
  toggleRowSelection(playerID)
}

function toggleRowSelection(playerID){
  resetBackgroundColor();
  let elmRow = document.getElementById(playerID);

  elmRow.classList.add('bg-secondary');
  elmRow.classList.add('selected');

  let text = "Stiche für "
  let label = document.getElementById("PlayerNameNI");
  label.innerText = text + document.getElementById(playerID + " - name").innerText;
}

function selectNextPlayer(players, playerId) {
  let keys = Array.from(players.keys());
  let playerIndex = keys.indexOf(playerId);
  let playerID = keys[(playerIndex + 1) % players.size];
  toggleRowSelection(playerID);
}

async function adjustPoints(players){
  let input = document.getElementById("numberInput")
  let stiche = parseInt(input.value);
  input.value = "";

  let points = 5;

  let isHeartRount = 1;
  if (document.getElementById('HeartPicture').name === "heartX2Fill.svg"){
    isHeartRount = 2;
  }

  let list = document.getElementById("playerList")
  let playerId = list.querySelector('.selected').id;

  if (stiche > 0){
    points = -1 * stiche * isHeartRount;
  }
  await players.get(playerId).adjustPoints(points);

  selectNextPlayer(players, playerId);
  setFocusToElementID('numberInput');


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

function setFocusToElementID(ElementID){
  document.getElementById(ElementID).focus();
}