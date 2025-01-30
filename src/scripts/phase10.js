class Phase10 extends gameBase{
  ui = null;
  constructor() {
    super(0, "Strafpunkte für ",
      ["Name", "Punkte"],
      ["col-8 col-md-6", "col-4 col-md-3"]);
    this.ui = new Phase10UI();
  }

  startGame() {
    // Hide the input form and start button
    document.getElementById("playerInput").classList.add("d-none");
    document.getElementById("startButton").classList.add("d-none");

    document.getElementById("adjustScore").classList.remove('d-none');
    document.getElementById("PlayerNameNI").classList.remove("d-none");
    this.toggleRowSelection('player0');
    this.setFocusToElementID('numberInput');
  }

  adjustPoints(){

    let numberInput = this.getNumberInput();
    let points;
    if (!isNaN(numberInput)){
      points = Number(numberInput);
    }
    else{
      points = 0;
    }

    let selectedPlayer = this.getSelectedPlayer();

    this.players.get(selectedPlayer).adjustPoints(points);
    this.endGame();

    this.selectNextPlayer(selectedPlayer);
    this.setFocusToElementID('numberInput');
  }

  endGame(){

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
      playerNameField.id = playerTag + ' - ' + this.colHeadings[0].toLowerCase();
      playerNameField.innerText = playerName;

      let playerPointsField = document.createElement('div');
      playerPointsField.className = 'col-4 col-md-3';
      playerPointsField.id = playerTag + ' - ' + this.colHeadings[1].toLowerCase();
      playerPointsField.innerText = this.startPoints.toString();

      playerRow.appendChild(playerNameField);
      playerRow.appendChild(playerPointsField);

      listElm.className = 'dropdown-item';
      listElm.id = playerTag;

      listView.appendChild(playerRow);
      this.setFocusToElementID('playerNameInput');
    }
  }

  setUp(){
    this.ui.setUp();
    document.getElementById("adjustScore").classList.add("d-none");
    document.getElementById("PlayerNameNI").classList.add("d-none");

    document.getElementById('playerList').addEventListener('click', this.toggleRowSelectionEvent.bind(this));
    document.getElementById('addPlayerBtn').addEventListener('click', this.addPlayer.bind(this));
    document.getElementById('adjustPointsBtn').addEventListener('click', this.adjustPoints.bind(this));
    document.getElementById('startButton').addEventListener('click', this.startGame.bind(this, this.players));
  }
}

window.Phase10 = Phase10;

class Phase10UI extends UIElements{
  setUp(){
    this.createHeading("Spiel: Phase 10");
    this.createPlayerList();
    this.createPlayerNameInput("Spieler Name", "Hinzufügen");

    this.createPointsInput("Strafpunkte für: ", "0 Punkte", "Hinzufügen");
    this.createStartBtn("Spiel starten");
    this.addModal("Spiel zu Ende");
  }

}

window.Phase10UI = Phase10UI;