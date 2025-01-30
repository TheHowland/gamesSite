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
    this.createPlayerTable();
    this.createPlayerNameInput("Spieler Name", "Hinzufügen");

    this.createPointsInput("Stiche: ", "0 Punkte", "Hinzufügen");
    this.createStartBtn("Spiel starten");
    this.addModal("Spiel zu Ende");
  }

}

window.WizardUI = WizardUI;