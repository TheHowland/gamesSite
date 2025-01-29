class Player{
  playerID = null
  name = null;
  points = 0;

  constructor(name, playerID){
    this.name = name;
    this.points = 21;
    this.playerID = playerID
  }

  adjustPoints(points){
    this.points += points;
    document.getElementById(this.playerID + " - points").innerHTML = this.points
  }
}

window.Player = Player;


function addPlayer(players) {
  let listView = document.getElementById('playerList');
  let count = players.size;
  let input = document.getElementById('playerNameInput');
  let playerName = input.value.trim();
  input.value = '';

  if (playerName) {
    let playerTag = 'player' + count.toString();
    let listElm = document.createElement('li');

    players.set(playerTag, new Player(playerName, playerTag));

    let playerRow = document.createElement('div');
    playerRow.className = 'row';
    playerRow.id = playerTag;

    let playerNameField = document.createElement('div');
    playerNameField.className = 'col-8 col-md-6';
    playerNameField.id = playerTag + ' - name';
    playerNameField.innerText = playerName;

    let playerPointsField = document.createElement('div');
    playerPointsField.className = 'col-4 col-md-3';
    playerPointsField.id = playerTag + ' - points';
    playerPointsField.innerText = '21';

    playerRow.appendChild(playerNameField);
    playerRow.appendChild(playerPointsField);

    listElm.className = 'dropdown-item';
    listElm.id = playerTag;

    listView.appendChild(playerRow);
    setFocusToElementID('playerNameInput');
  }
}

function resetBackgroundColor() {
  let selected = document.getElementById('playerList').querySelector('.selected');
  if (selected) {
    selected.classList.remove('bg-secondary');
    selected.classList.remove('selected');
  }
}

function toggleRowSelection(playerID) {
  resetBackgroundColor();
  let elmRow = document.getElementById(playerID);

  elmRow.classList.add('bg-secondary');
  elmRow.classList.add('selected');

  let text = 'Stiche für ';
  let label = document.getElementById('PlayerNameNI');
  label.innerText = text + document.getElementById(playerID + ' - name').innerText;
}

function selectNextPlayer(players, playerId) {
  let keys = Array.from(players.keys());
  let playerIndex = keys.indexOf(playerId);
  let playerID = keys[(playerIndex + 1) % players.size];
  toggleRowSelection(playerID);
}

function adjustPoints(players, pointsFkt, endGameFkt) {
  let input = document.getElementById('numberInput');
  let stiche = parseInt(input.value);
  if (isNaN(stiche)){
    stiche = 0;
  }
  input.value = '';

  let points = pointsFkt(stiche);

  let list = document.getElementById('playerList');
  let playerId = list.querySelector('.selected').id;

  players.get(playerId).adjustPoints(points);

  endGameFkt(players);

  selectNextPlayer(players, playerId);
  setFocusToElementID('numberInput');
}

function setFocusToElementID(ElementID) {
  document.getElementById(ElementID).focus();
}