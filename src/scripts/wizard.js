class Wizard extends gameBase{
  ui = null;
  constructor() {
    super(0, "Strafpunkte für ");
    this.ui = new WizardUI();
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
      tableRow.className = 'row-col-3';

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

  setUp(){
    this.ui.setUp();
    document.getElementById("adjustScore").classList.add("d-none");
    document.getElementById("PlayerNameNI").classList.add("d-none");

    document.getElementById('playerTableBody').addEventListener('click', (event) => {
      this.toggleRowSelectionEvent.bind(this, event, 'playerTableBody', 'table-info')();
    });
    document.getElementById('addPlayerBtn').addEventListener('click', this.addPlayerToTable.bind(this));
    document.getElementById('adjustPointsBtn').addEventListener('click', this.adjustPoints.bind(this));
    document.getElementById('startButton').addEventListener('click', this.startGame.bind(this, this.players));
  }
}

window.Wizard = Wizard;

class WizardUI extends UIElements{
  setUp(){
    this.createHeading("Spiel: Wizard");
    this.createPlayerTable(["Name", "Punkte", "Stiche"], ["col-7", "col-3", "col-2"]);
    this.createPlayerNameInput("Spieler Name", "Hinzufügen");

    this.createPointsInput("Stiche: ", "0 Punkte", "Hinzufügen");
    this.createStartBtn("Spiel starten");
    this.addModal("Spiel zu Ende");
  }

}

window.WizardUI = WizardUI;