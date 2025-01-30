class Player{
  playerID = null
  name = null;
  points = 0;

  constructor(name, playerID, points){
    this.name = name;
    this.points = points;
    this.playerID = playerID
    console.log(this.playerID)
  }

  adjustPoints(points){
    this.points += points;
    document.getElementById(this.playerID + " - points").innerHTML = this.points
  }
}

window.Player = Player;

class gameBase{
  players = new Map();
  pointsInfoText = null;
  startPoints;
  constructor(startPoints, pointsInfoText) {
    this.pointsInfoText = pointsInfoText;
    this.startPoints = startPoints;
  }


  addPlayer() {
    let listView = document.getElementById('playerList');
    let count = this.players.size;
    let input = document.getElementById('playerNameInput');
    let playerName = input.value.trim();
    input.value = '';

    if (playerName) {
      let playerTag = 'player' + count.toString();
      let listElm = document.createElement('li');

      this.players.set(playerTag, new Player(playerName, playerTag, this.startPoints));

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
      playerPointsField.innerText = this.startPoints.toString();

      playerRow.appendChild(playerNameField);
      playerRow.appendChild(playerPointsField);

      listElm.className = 'dropdown-item';
      listElm.id = playerTag;

      listView.appendChild(playerRow);
      this.setFocusToElementID('playerNameInput');
    }
  }

  addPlayerToTable() {
    let listView = document.getElementById('playerTableBody');
    let count = this.players.size;
    let input = document.getElementById('playerNameInput');
    let playerName = input.value.trim();
    input.value = '';

    if (playerName) {
      let playerTag = 'player' + count.toString();
      let tableRow = document.createElement('tr');
      tableRow.id = playerTag;
      tableRow.className = 'row-cols-3';

      this.players.set(playerTag, new Player(playerName, playerTag, this.startPoints));

      let playerNameField = document.createElement('td');
      playerNameField.className = 'col-7';
      playerNameField.id = playerTag + ' - name';
      playerNameField.innerText = playerName;

      let playerPointsField = document.createElement('td');
      playerPointsField.className = 'col-3';
      playerPointsField.id = playerTag + ' - points';
      playerPointsField.innerText = this.startPoints.toString();

      let playerSticheField = document.createElement('td');
      playerSticheField.className = 'col-2';
      playerSticheField.id = playerTag + ' - stiche';
      playerSticheField.innerText = '-';

      tableRow.appendChild(playerNameField);
      tableRow.appendChild(playerPointsField);
      tableRow.appendChild(playerSticheField);

      listView.appendChild(tableRow);
      this.setFocusToElementID('playerNameInput');
    }
  }

  resetBackgroundColor(ElementID, classListArg) {
    let selected = document.getElementById(ElementID).querySelector('.selected');
    if (selected) {
      selected.classList.remove(classListArg);
      selected.classList.remove('selected');
    }
  }

  toggleRowSelectionEvent(event, ElementID, classListArg) {
    let playerID = event.target.parentNode.id;
    console.log(playerID);
    this.toggleRowSelection(playerID, ElementID, classListArg);
  }

  toggleRowSelection(playerID, ElementID, classListArg) {
    this.resetBackgroundColor(ElementID, classListArg);
    let elmRow = document.getElementById(playerID);

    elmRow.classList.add(classListArg);
    elmRow.classList.add('selected');

    let text = this.pointsInfoText;
    let label = document.getElementById('PlayerNameNI');
    label.innerText = text + document.getElementById(playerID + ' - name').innerText;
  }

  selectNextPlayer(playerId) {
    let keys = Array.from(this.players.keys());
    let playerIndex = keys.indexOf(playerId);
    let nextPlayerID = keys[(playerIndex + 1) % this.players.size];
    this.toggleRowSelection(nextPlayerID);
  }

  getNumberInput(){
    let input = document.getElementById('numberInput');
    let stiche = parseInt(input.value);
    input.value = '';
    return stiche;
  }

  getSelectedPlayer(){
    let list = document.getElementById('playerList');
    return list.querySelector('.selected').id;
  }

  setFocusToElementID(ElementID) {
    document.getElementById(ElementID).focus();
  }
}

