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
    document.getElementById("startButtonDiv").classList.add("d-none");

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

  resetGame(){
    for (let player of Array.from(this.players.keys())){
      super.resetPlayer(player, player + ' - ' + this.pointsFieldName);
    }
  }

  setUp(){
    this.ui.navbar("Phase 10");
    this.ui.createPlayerTable(this.toggleRowSelectionEvent.bind(this), this.longHold, this.correctPoints.bind(this));
    this.ui.longPressModalTexts("Punkte anpassen", "", "neue Punkte eingeben", null);

    this.ui.createPlayerNameInput("Spieler Name", "Hinzufügen",
      this.addPlayerToTable.bind(this)
    );
    this.ui.pointsInput("Strafpunkte für ", "0 Strafpunkte", "Hinzufügen",
      this.adjustPoints.bind(this),
      null,
      null
    );
    this.ui.startBtn("Spiel starten", this.startGame.bind(this));
    this.ui.infoModal();
    this.ui.resetButton(this.resetGame.bind(this));
  }
}

window.Phase10 = Phase10;

class Phase10UI extends UIElements{

}

window.Phase10UI = Phase10UI;