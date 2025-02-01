class TwentyOneDown extends gameBase{
  ui = null;
  pointsFieldName = null;
  constructor() {
    super(21, "Stiche für ",
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

  toggleHeratPicture(){
    let heartPicture = document.getElementById('HeartPicture')
    if (heartPicture.name === "heartX2.svg"){
      heartPicture.name = "heartX2Fill.svg";
      heartPicture.src = "src/resources/heartX2Fill.svg";
    }
    else{
      heartPicture.name = "heartX2.svg";
      heartPicture.src = "src/resources/heartX2.svg";
    }
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

    let playerPoints = this.players.get(selectedPlayer).adjustPoints(points);
    document.getElementById(selectedPlayer + ' - ' + this.pointsFieldName).innerHTML =  playerPoints;

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

      modalBody += player.name + " - " + player.points + "\n";
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

  setUp(){
    this.ui.navbar("21 ab");
    this.ui.createPlayerTable(this.toggleRowSelectionEvent.bind(this), this.longHold);
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
  }
}
window.TwentyOneDown = TwentyOneDown;

class TwentyOneDownUI extends UIElements{
  heartPicture(btnFkt){
    let heartPicture = document.createElement("div")
    heartPicture.className = "col-2 col-md-1";
    let img = document.createElement("img");
    img.id = "HeartPicture";
    img.name="heartX2.svg";
    img.src="src/resources/heartX2.svg";
    img.className="img-fluid";
    img.alt="x2";
    heartPicture.appendChild(img);

    return heartPicture;
  }
}
window.TwentyOneDownUI = TwentyOneDownUI;