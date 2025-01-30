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

  setPoints(points){
    this.points = points;
  }

  adjustPoints(points, fieldName){
    this.points += points;
    return this.points;
  }
}

window.Player = Player;

class gameBase{
  players = new Map();
  pointsInfoText = null;
  startPoints;
  colHeadings = null;
  colSpacings = null;
  inputExplText = null;

  constructor(startPoints, pointsInfoText, colHeadings, colSpacings, inputExplText){
    this.pointsInfoText = pointsInfoText;
    this.startPoints = startPoints;
    this.colHeadings = colHeadings;
    this.colSpacings = colSpacings;
    this.inputExplText = inputExplText;
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
      tableRow.className = 'row-col-' + this.colHeadings.length.toString();

      this.players.set(playerTag, new Player(playerName, playerTag, this.startPoints));

      let elms = [];
      for (let i = 0; i < this.colHeadings.length; i++) {
        let col = document.createElement('td');
        col.className = this.colSpacings[i];
        col.id = playerTag + ' - ' + this.colHeadings[i].toLowerCase();
        tableRow.appendChild(col);
        elms.push(col);
      }
      elms[0].innerText = playerName;
      listView.appendChild(tableRow);
      return elms;
    }
    return [];
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

    let text = this.inputExplText;
    let label = document.getElementById('PlayerNameNI');
    label.innerText = text + this.players.get(playerID).name;
  }

  selectNextPlayer(playerId, ElementID, classListArg) {
    let keys = Array.from(this.players.keys());
    let playerIndex = keys.indexOf(playerId);
    let nextPlayerID = keys[(playerIndex + 1) % this.players.size];
    this.toggleRowSelection(nextPlayerID, ElementID, classListArg);
  }

  getNumberInput(){
    let input = document.getElementById('numberInput');
    let stiche = parseInt(input.value);
    input.value = '';
    return stiche;
  }

  getSelectedPlayer(){
    let list = document.getElementById('playerTableBody');
    return list.querySelector('.selected').id;
  }

  setFocusToElementID(ElementID) {
    document.getElementById(ElementID).focus();
  }
}

