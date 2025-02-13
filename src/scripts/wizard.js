class Wizard extends gameBase{
  ui = null;
  pointsFieldName = null;
  playerStiche = new Map();
  roundsPlayed = 0;
  longHold;

  constructor() {
    super(0, "Stiche für ",
      ["Name", "Punkte", "Stiche"],
      ["col-7", "col-3", "col-2"],
      "Angesagte Stiche von ");
    this.ui = new WizardUI(this.colHeadings, this.colSpacings);
    this.pointsFieldName = this.colHeadings[1].toLowerCase();
    this.sticheFieldName = this.colHeadings[2].toLowerCase();

    this.correctPointsHandler = this.correctPoints.bind(this);
    this.correctSticheHandler = this.correctStiche.bind(this);

    this.playerStiche = new Map();

  }

  startGame() {
    if (this.players.size < 2){
      this.ui.infoModalTexts("Spielstart nicht möglich", "Es müssen mindestens 2 Spieler hinzugefügt werden.");
      let myModal = new bootstrap.Modal(document.getElementById('infoModal'));
      myModal.show();
      return;
    }
    // Hide the input form and start button
    document.getElementById("playerInput").classList.add("d-none");
    document.getElementById("startButton").classList.add("d-none");
    document.getElementById("adjustPointsBtn").classList.add("d-none");

    document.getElementById("adjustScore").classList.remove('d-none');
    document.getElementById("loginSticheBtn").classList.remove("d-none");
    document.getElementById("adjustSticheBtn").classList.remove('d-none');

    document.getElementById("PlayerNameNI").classList.remove("d-none");
    this.setFocusToElementID('numberInput');

    let playerID = Array.from(this.players.keys())[this.roundsPlayed % this.players.size];
    this.toggleRowSelection(playerID, 'playerTableBody', 'table-info');
    document.getElementById("PlayerNameNI").innerText = this.inputExplText + this.players.get(playerID).name;
  }

  resetGame(){
    for (let player of Array.from(this.players.keys())){
      this.playerStiche.set(player, 0);
      document.getElementById(player + ' - ' + this.sticheFieldName).innerText = '-';
      super.resetPlayer(player, player + ' - ' + this.pointsFieldName);
    }
    this.roundsPlayed = 0;
    document.getElementById('roundNumber').innerText = "Runde: " + (this.roundsPlayed + 1).toString();
  }

  adjustPoints(){

    let numberInput = this.getNumberInput();
    if (isNaN(numberInput)){
      numberInput = 0;
    }
    let selectedPlayer = this.getSelectedPlayer();

    let diffPoints = 0;
    if(this.playerStiche.get(selectedPlayer) === numberInput){
      diffPoints += numberInput * 10 + 20;
    }
    else{
      diffPoints = -1 * Math.abs(this.playerStiche.get(selectedPlayer) - numberInput) * 10;
    }

    let playerPoints = this.players.get(selectedPlayer).adjustPoints(diffPoints);
    document.getElementById(selectedPlayer + ' - ' + this.pointsFieldName).innerHTML =  playerPoints;

    this.selectNextPlayer(selectedPlayer, 'playerTableBody', 'table-info');
    this.setFocusToElementID('numberInput');
  }

  correctStiche(){
    let selectedPlayer = this.getSelectedPlayer();
    let points = Number(document.getElementById('longPressModalInput').value);
    if (isNaN(points)){
      points = 0;
    }
    this.playerStiche.set(selectedPlayer, points);
    document.getElementById(selectedPlayer + ' - ' + this.sticheFieldName).innerHTML =  points.toString();
    this.ui.longPressModalTexts(null, null, null, "");
  }

  endGame(){
    let modalBody = ""
    let sortedPlayers = Array.from(this.players.values()).sort((player1, player2) => player2.points - player1.points);
    let winningPlayer = "";

    for (let player of sortedPlayers){
      modalBody += player.name + ": " + player.points +"\n";
      console.log(player.points);
      console.log(player.name);
      console.log("-------")
    }

    this.confetti.addConfetti();
    this.ui.infoModalTexts("Spiel beendet", "Gewonnen hat: " + winningPlayer + "\n" + modalBody);
    let myModal = new bootstrap.Modal(document.getElementById('infoModal'));
    myModal.show();
  }

  adjustStiche(){
    let stiche = this.getNumberInput();
    if (isNaN(stiche)){
      stiche = 0;
    }
    let selectedPlayer = this.getSelectedPlayer()
    this.playerStiche.set(selectedPlayer, stiche);
    document.getElementById(selectedPlayer + ' - ' + this.sticheFieldName).innerHTML = stiche.toString();
    this.selectNextPlayer(selectedPlayer, 'playerTableBody', 'table-info');
    this.setFocusToElementID('numberInput');

  }

  addPlayerToTable() {
    let elms = super.addPlayerToTable();
    //Name is set in parent (elms[0])
    elms[1].innerText = this.startPoints.toString();
    elms[2].innerText = '-';

    this.playerStiche.set(Array.from(this.players.values()).pop().playerID, 0);

    this.setFocusToElementID('playerNameInput');
  }

  startRound(){
    let totalStiche = 0;
    for(let stiche of Array.from(this.playerStiche.values())){
      totalStiche += stiche;
    }
    if (totalStiche === (this.roundsPlayed + 1)){
      let keyArray = Array.from(this.players.keys())
      let playerIndex = keyArray.indexOf(this.getSelectedPlayer());
      if (playerIndex === 0){
        playerIndex = this.players.size-1;
      }
      else{
        playerIndex -= 1;
      }
      let playerName = this.players.get(keyArray[playerIndex]).name;
      this.ui.infoModalTexts("Stiche gleich der Rundenzahl", "Der letze Spieler ("+ playerName + ") der angesagt hat, muss einen mehr oder weniger sagen.");
      let myModal = new bootstrap.Modal(document.getElementById('infoModal'));
      myModal.show();
      console.log("Stiche dürfen nicht aufgehen, letzer spieler der angesagt hat, muss einen mehr oder weniger sagen");
      return;
    }

    //remove stiche einloggen btn
    document.getElementById("loginSticheBtn").classList.add("d-none");
    // add runde beenden btn
    document.getElementById("endRoundBtn").classList.remove("d-none");
    // adjust stiche deaktivieren
    document.getElementById("adjustSticheBtn").classList.add("d-none");
    // adjust points aktivieren
    document.getElementById("adjustPointsBtn").classList.remove("d-none");
    //use longpress for stiche
    document.getElementById('longPressModalSaveBtn').removeEventListener('click', this.correctSticheHandler);
    document.getElementById('longPressModalSaveBtn').addEventListener('click', this.correctPointsHandler);
    this.ui.longPressModalTexts("Punkte anpassen", "", "neue Punkte eingeben", null);

    this.inputExplText = "Tatsächliche Stiche von ";
    let playerID = this.getSelectedPlayer();
    document.getElementById("PlayerNameNI").innerText = this.inputExplText + this.players.get(playerID).name;

    this.setFocusToElementID('numberInput');

  }

  endRound(){
    if(this.roundsPlayed === 9){
      this.endGame();
    }

    document.getElementById("endRoundBtn").classList.add("d-none");
    document.getElementById("loginSticheBtn").classList.remove("d-none");
    document.getElementById("adjustPointsBtn").classList.add("d-none");
    document.getElementById("adjustSticheBtn").classList.remove("d-none");
    //use longpress for points
    document.getElementById('longPressModalSaveBtn').removeEventListener('click', this.correctPointsHandler);
    document.getElementById('longPressModalSaveBtn').addEventListener('click', this.correctSticheHandler);
    this.ui.longPressModalTexts("Stiche anpassen", "", "neue Stiche Anzahl eingeben", null);


    //reset Stiche in table
    for (let playerID of Array.from(this.playerStiche.keys())){
      this.playerStiche.set(playerID, 0);
      document.getElementById(playerID + ' - ' + this.sticheFieldName).innerText = '-';
    }

    //select new player to start with Stiche announcing
    this.roundsPlayed += 1;
    document.getElementById('roundNumber').innerText = "Runde: " + (this.roundsPlayed + 1).toString();
    let playerID = Array.from(this.players.keys())[this.roundsPlayed % this.players.size];
    this.inputExplText = "Angesagte Stiche von ";
    this.toggleRowSelection(playerID, 'playerTableBody', 'table-info');

    this.setFocusToElementID('numberInput');
  }

  setUp(){
    this.ui.setUp(
      "Wizard",
      this.toggleRowSelectionEvent.bind(this), this.resetBackgroundColor.bind(this), this.longHold,  this.correctSticheHandler,
      this.addPlayerToTable.bind(this), this.adjustPoints.bind(this),
      this.startGame.bind(this),
      this.resetGame.bind(this)
    )
    this.ui.activateRoundNumber();
    this.ui.adjustSticheBtn(this.adjustStiche.bind(this));
    this.ui.startRoundBtn(this.startRound.bind(this));
    this.ui.endRoundBtn(this.endRound.bind(this));

    this.ui.playerNameInputTexts("Spieler Name", "Hinzufügen");
    this.ui.setPointsInputTexts("Stiche für ", "0 Stiche", "Hinzufügen",)
    this.ui.longPressModalTexts("Stiche anpassen", "", "neue Stiche eingeben", null);
  }
}

window.Wizard = Wizard;

class WizardUI extends UIElements{

  constructor(colHeadings, colSpacing){
    super(colHeadings, colSpacing);
  }

  activateRoundNumber(){
    document.getElementById("roundNumber").classList.remove("d-none");
  }

  startRoundBtn(btnFkt){
    let div = document.getElementById('startButtonDiv');
    div.appendChild(this.btnFaktory("loginSticheBtn", "Stiche einloggen", "btn btn-primary w-50 d-none"));

    document.getElementById("loginSticheBtn").addEventListener('click', btnFkt)
  }

  endRoundBtn(btnFkt){
    let div = document.getElementById('startButtonDiv');
    div.appendChild(this.btnFaktory("endRoundBtn", "Runde beenden", "btn btn-primary w-50 d-none"));

    document.getElementById("endRoundBtn").addEventListener('click', btnFkt)
  }

  adjustSticheBtn(btnFkt){
    let div = document.getElementById('adjustPointsBtnDiv');
    div.appendChild(this.btnFaktory("adjustSticheBtn", "Hinzufügen", "btn btn-primary w-100 d-none"));

    document.getElementById("adjustSticheBtn").addEventListener('click', btnFkt)
  }
}

window.WizardUI = WizardUI;