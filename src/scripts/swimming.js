class Swimming extends gameBase{
  ui = null;
  pointsFieldName = null;
  constructor() {
    super(3, "Stiche für ",
      ["Name", "Punkte"],
      ["col-8 col-md-6", "col-4 col-md-3"],
      "Stiche für ");
    this.ui = new TwentyOneDownUI(this.colHeadings, this.colSpacings);
    this.pointsFieldName = this.colHeadings[1].toLowerCase();
  }

  startGame() {
    // Hide the input form and start button
    document.getElementById("playerInput").classList.add("d-none");
    document.getElementById("startButtonDiv").classList.add("d-none");

    document.getElementById("adjustScore").classList.remove('d-none');
    document.getElementById("PlayerNameNI").classList.remove("d-none");
    this.toggleRowSelection('player0', 'playerTableBody', 'table-info', "Stiche für ");
    this.setFocusToElementID('numberInput');
  }

  adjustPoints(){
    let isHeartRound = 1;
    if (document.getElementById('HeartPicture').name === 'heartX2Fill.svg') {
      isHeartRound = 2;
    }

    let numberInput = this.getNumberInput();
    let points;
    if (!isNaN(numberInput)){
      points = points = -1 * Number(numberInput) * isHeartRound;
    }
    else{
      points = 5;
    }

    let selectedPlayer = this.getSelectedPlayer();

    document.getElementById(selectedPlayer + ' - ' + this.pointsFieldName).innerHTML =  this.players.get(selectedPlayer).adjustPoints(points);

    this.endGame();

    this.selectNextPlayer(selectedPlayer, 'playerTableBody', 'table-info');
    this.setFocusToElementID('numberInput');
  }

  endGame(){
    let isEnding = false;

    let modalBody = ""
    let sortedPlayers = Array.from(this.players.values()).sort((player1, player2) => player1.points - player2.points);
    let winningPlayer = "";

    for (let player of sortedPlayers){
      if (player.points <= 0){
        isEnding = true;
        winningPlayer = player.name
        player.points = 0;
      }

      modalBody += player.name + ": " + player.points + "\n";
      console.log(player.points);
      console.log(player.name);
      console.log("-------")
    }

    if (isEnding){
      this.ui.infoModalTexts("Spiel beendet", "Gewonnen hat: " + winningPlayer + "\n" + modalBody);
      let myModal = new bootstrap.Modal(document.getElementById('infoModal'));
      myModal.show();
    }
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
    this.ui.navbar("21 ab");
    this.ui.createPlayerTable(this.toggleRowSelectionEvent.bind(this), this.longHold, this.correctPoints.bind(this));
    this.ui.longPressModalTexts("Punkte anpassen", "", "neue Punkte eingeben", null);

    this.ui.createPlayerNameInput("Spieler Name", "Hinzufügen",
      this.addPlayerToTable.bind(this)
    );
    this.ui.pointsInput("Stiche für ", "0 Stiche", "Hinzufügen",
      this.adjustPoints.bind(this),
      this.ui.heartPicture(),
      this.toggleHeratPicture.bind(this)
    );
    this.ui.startBtn("Spiel starten", this.startGame.bind(this));
    this.ui.infoModal();
    this.ui.resetButton("Spiel zurücksetzen", this.resetGame.bind(this));
  }
}
window.Swimming = Swimming;

class SwimmingUI extends UIElements{

}
window.SwimmingUI = SwimmingUI;