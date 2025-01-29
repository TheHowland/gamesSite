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

  resetBackgroundColor() {
    let selected = document.getElementById('playerList').querySelector('.selected');
    if (selected) {
      selected.classList.remove('bg-secondary');
      selected.classList.remove('selected');
    }
  }

  toggleRowSelectionEvent(event) {
    let playerID = event.target.parentNode.id;
    console.log(playerID);
    this.toggleRowSelection(playerID);
  }

  toggleRowSelection(playerID) {
    this.resetBackgroundColor();
    let elmRow = document.getElementById(playerID);

    elmRow.classList.add('bg-secondary');
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

