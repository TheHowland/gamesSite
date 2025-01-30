class Phase10 extends gameBase{
  ui = null;
  constructor() {
    super(0, "Strafpunkte für ",
      ["Name", "Punkte"],
      ["col-8 col-md-6", "col-4 col-md-3"],
      'Strafpunkte für ');
    this.ui = new Phase10UI(this.colHeadings, this.colSpacings);
    this.pointsFieldName = this.colHeadings[1].toLowerCase();
  }

  startGame() {
    // Hide the input form and start button
    document.getElementById("playerInput").classList.add("d-none");
    document.getElementById("startButton").classList.add("d-none");

    document.getElementById("adjustScore").classList.remove('d-none');
    document.getElementById("PlayerNameNI").classList.remove("d-none");
    this.toggleRowSelection('player0', 'playerTableBody', 'table-info', "Strafpunkte für ");
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

    let playerPoints = this.players.get(selectedPlayer).adjustPoints(points);
    document.getElementById(selectedPlayer + ' - ' + this.pointsFieldName).innerHTML =  playerPoints;

    this.endGame();

    this.selectNextPlayer(selectedPlayer, 'playerTableBody', 'table-info');
    this.setFocusToElementID('numberInput');
  }

  endGame(){

  }

  addPlayerToTable() {
    let elms = super.addPlayerToTable();
    //Name is set in parent (elms[0])
    elms[1].innerText = this.startPoints.toString();

    this.setFocusToElementID('playerNameInput');
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

    //long press
    document.getElementById('playerTableBody').addEventListener('touchstart', (event) => {
      this.toggleRowSelectionEvent.bind(this, event, 'playerTableBody', 'table-info')();
      this.longHold = window.setTimeout(() => {
        let myModal = new bootstrap.Modal(document.getElementById('longPressModal'));
        myModal.show();
      }, 500);

    });
    document.getElementById('playerTableBody').addEventListener('touchend', (event) => {
      window.clearTimeout(this.longHold);
    });
    document.getElementById('longPressModalSaveBtn').addEventListener('click', this.correctPoints.bind(this));

  }
}

window.Phase10 = Phase10;

class Phase10UI extends UIElements{
  setUp(){
    this.createHeading("Spiel: Phase 10");
    this.createPlayerTable();
    this.createPlayerNameInput("Spieler Name", "Hinzufügen");

    this.createPointsInput("Strafpunkte für: ", "0 Punkte", "Hinzufügen");
    this.createStartBtn("Spiel starten");
    this.infoModal("Spiel zu Ende");

    this.longPressModal();
    this.longPressModalTexts("Strafpunkte anpassen", "", "neue Punkte eingeben", null);

  }

}

window.Phase10UI = Phase10UI;