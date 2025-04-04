class Phase10 extends gameBase{
  ui = null;
  constructor() {
    super(0, "Strafpunkte für ",
      ["Name", "Punkte"],
      ["col-8 col-md-6", "col-4 col-md-3"],
      'Strafpunkte für ');
    this.ui = new Phase10UI(this.colHeadings, this.colSpacings, this.resetGame.bind(this), this.ejectConfetti.bind(this));
    this.pointsFieldName = this.colHeadings[1].toLowerCase();
  }

  startGame() {
    // Hide the input form and start button
    document.getElementById("playerInput").classList.add("d-none");
    document.getElementById("startButtonDiv").classList.add("d-none");
    document.getElementById('sortButtonDiv').classList.add("d-none");

    document.getElementById("adjustScore").classList.remove('d-none');
    document.getElementById("PlayerNameNI").classList.remove("d-none");
    document.getElementById('resetButtonDiv').classList.remove('d-none');
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

    this.selectNextPlayer(selectedPlayer, 'playerTableBody', 'table-info');
    this.setFocusToElementID('numberInput');

    this.endGame();
  }

  endGame(){
    let modalBody = ""
    let sortedPlayers = Array.from(this.players.values()).sort((player1, player2) => player1.points - player2.points);

    for (let player of sortedPlayers){
      modalBody += player.name + ": " + player.points + "\n";
      console.log(player.points);
      console.log(player.name);
      console.log("-------")
    }

    let resetInfoText = "\nMit dem klick auf okay werden alle Punkte auf den Anfangswert zurückgesetzt, alle Spieler bleiben erhalten. Das kann nicht rückgängig gemacht werden."
    this.ui.okModalTexts("Spiel Auswertung", "Punkte absteigend:\n" + modalBody + resetInfoText);
  }

  addPlayerToTable() {
    let elms = super.addPlayerToTable();
    //Name is set in parent (elms[0])
    elms[1].innerText = this.startPoints.toString();

    this.setFocusToElementID('playerNameInput');
  }

  resetGame(){
    this.endGame();
    for (let player of Array.from(this.players.keys())){
      super.resetPlayer(player, player + ' - ' + this.pointsFieldName);
    }
  }

  ejectConfetti(){
    this.confetti.addConfetti();
  }

  reorderPlayers(){
    this.players = new Map()
    this.importSavedPlayers()
  }

  setUp(){
    this.ui.setUp(
      "Phase 10",
      this.toggleRowSelectionEvent.bind(this), this.resetBackgroundColor.bind(this), this.longHold, this.correctPoints.bind(this),
      this.addPlayerToTable.bind(this),
      this.adjustPoints.bind(this),
      this.startGame.bind(this),
      this.resetGame.bind(this),
      this.reorderPlayers.bind(this),
    )
    this.ui.playerNameInputTexts("Spieler Name", "Hinzufügen");
    this.ui.setPointsInputTexts("Strafpunkte für ", "0 Strafpunkte", "Hinzufügen",)
    this.ui.longPressModalTexts("Punkte anpassen", "", "neue Punkte eingeben", null);
  }
}

window.Phase10 = Phase10;

class Phase10UI extends UIElements{
  constructor(colHeadings, colSpacings ,resetGameFkt, confettiFkt) {
    super(colHeadings, colSpacings);
    this.resetGameFkt = resetGameFkt;
    this.confettiFkt = confettiFkt;
  }

  resetButton(resetFkt, confettiFkt){
      super.resetButton(null);
      let resetBtn = document.getElementById('resetButton');
      resetBtn.onclick = () => {
        this.confettiFkt();
        let myModal = new bootstrap.Modal(document.getElementById('okModal'));
        myModal.show();
      }
      resetBtn.innerText = "Auswerten / Reset";
      document.getElementById('okModalSaveBtn').addEventListener('click', this.resetGameFkt.bind(this));

    }
}

window.Phase10UI = Phase10UI;