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

    this.startGameHandler = this.startGame.bind(this);
    this.startRoundHandler = this.toggleStartAndEvalRound.bind(this);
    this.adjustSticheHandler = this.adjustStiche.bind(this);
    this.adjustPointsHandler = this.adjustPoints.bind(this);
    this.correctPointsHandler = this.correctPoints.bind(this);
    this.correctSticheHandler = this.correctStiche.bind(this);

    this.playerStiche = new Map();

  }

  startGame() {
    // Hide the input form and start button
    document.getElementById("playerInput").classList.add("d-none");

    let startBtn = document.getElementById("startButton");
    startBtn.removeEventListener('click', this.startGameHandler);
    startBtn.addEventListener('click', this.startRoundHandler);
    startBtn.childNodes[0].textContent = "Stiche einloggen";

    document.getElementById("adjustScore").classList.remove('d-none');
    document.getElementById("PlayerNameNI").classList.remove("d-none");
    this.setFocusToElementID('numberInput');

    let playerID = Array.from(this.players.keys())[this.roundsPlayed % this.players.size];
    this.toggleRowSelection(playerID, 'playerTableBody', 'table-info');
  }

  resetGame(){
    this.ui.infoModalTexts("Spiel zurücksetzen?", "Alle Punkte werden auf den Anfangswert zurückgesetzt, alle Spieler bleiben erhalten. Das kann nicht rückgängig gemacht werden.");
    let myModal = new bootstrap.Modal(document.getElementById('infoModal'));
    myModal.show();
  }

  toggleStartAndEvalRound(){
    let strartBtn = document.getElementById("startButton");
    if (strartBtn.childNodes[0].textContent === "Stiche einloggen"){
      let totalStiche = 0;
      for(let stiche of Array.from(this.playerStiche.values())){
        totalStiche += stiche;
      }
      if (totalStiche === (this.roundsPlayed + 1)){
        console.log("Stiche dürfen nicht aufgehen, letzer spieler der angesagt hat, muss einen mehr oder weniger sagen");
        return;
      }

      //use button to add points
      let adjustPointsBtn = document.getElementById("adjustPointsBtn");
      adjustPointsBtn.removeEventListener('click', this.adjustSticheHandler);
      adjustPointsBtn.addEventListener('click', this.adjustPointsHandler);

      //use longpress for points
      document.getElementById('longPressModalSaveBtn').removeEventListener('click', this.correctSticheHandler);
      document.getElementById('longPressModalSaveBtn').addEventListener('click', this.correctPointsHandler);
      this.ui.longPressModalTexts("Punkte anpassen", "", "neue Punkte eingeben", null);


      document.getElementById("PlayerNameNI").innerText = "Tatsächliche Stiche von ";
      this.inputExplText = "Tatsächliche Stiche von ";
      strartBtn.childNodes[0].textContent = "Runde abschließen";
    }
    else{
      let adjustPointsBtn = document.getElementById("adjustPointsBtn");
      adjustPointsBtn.removeEventListener('click', this.adjustPointsHandler);
      adjustPointsBtn.addEventListener('click', this.adjustSticheHandler);
      strartBtn.childNodes[0].textContent = "Stiche einloggen";

      //use longpress for stiche
      document.getElementById('longPressModalSaveBtn').removeEventListener('click', this.correctPointsHandler);
      document.getElementById('longPressModalSaveBtn').addEventListener('click', this.correctSticheHandler);
      this.ui.longPressModalTexts("Stiche anpassen", "", "neue Stiche Anzahl eingeben", null);


      document.getElementById("PlayerNameNI").innerText = "Angesagte Stiche von ";
      this.inputExplText = "Angesagte Stiche von ";

      //reset Stiche in table
      for (let playerID of Array.from(this.playerStiche.keys())){
        this.playerStiche.set(playerID, 0);
        document.getElementById(playerID + ' - ' + this.sticheFieldName).innerText = '-';
      }

      //select new player to start with Stiche announcing
      this.roundsPlayed += 1;
      document.getElementById('roundNumber').innerText = "Runde: " + (this.roundsPlayed + 1).toString();
      let playerID = Array.from(this.players.keys())[this.roundsPlayed % this.players.size];
      this.toggleRowSelection(playerID, 'playerTableBody', 'table-info');
    }
    console.log("Start Round");
  }

  adjustPoints(){

    let numberInput = this.getNumberInput();
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

  setUp(){
    this.ui.setUp();
    document.getElementById("adjustScore").classList.add("d-none");
    document.getElementById("PlayerNameNI").classList.add("d-none");

    document.getElementById('playerTableBody').addEventListener('click', (event) => {
      this.toggleRowSelectionEvent.bind(this, event, 'playerTableBody', 'table-info')();
    });

    //long press
    document.getElementById('playerTableBody').addEventListener('touchstart', (event) => {
      this.toggleRowSelectionEvent.bind(this, event, 'playerTableBody', 'table-info')();
      this.longHold = window.setTimeout(() => {
        console.log("Timout passed");
        let myModal = new bootstrap.Modal(document.getElementById('longPressModal'));
        myModal.show();
        }, 500);

    });
    document.getElementById('playerTableBody').addEventListener('touchend', (event) => {
      window.clearTimeout(this.longHold);
    });

    document.getElementById('addPlayerBtn').addEventListener('click', this.addPlayerToTable.bind(this));
    document.getElementById('adjustPointsBtn').addEventListener('click', this.adjustSticheHandler);
    document.getElementById('startButton').addEventListener('click', this.startGameHandler);
    //correct points with long press
    document.getElementById('longPressModalSaveBtn').addEventListener('click', this.correctSticheHandler);

    //resetButton
    document.getElementById('resetButton').addEventListener('click', this.resetGame.bind(this));
  }
}

window.Wizard = Wizard;

class WizardUI extends UIElements{

  constructor(colHeadings, colSpacing){
    super(colHeadings, colSpacing);
  }

  roundNumber(){
    let h6 = document.createElement('h6');
    h6.id = "roundNumber";
    h6.innerText = "Runde: 1";
    document.body.appendChild(h6);
  }

  setUp() {
    this.navbar();
    document.getElementById('navbarBrand').innerText = "Wizard";
    this.roundNumber();
    this.createPlayerTable(this.colHeadings, this.colSpacings);
    this.createPlayerNameInput("Spieler Name", "Hinzufügen");

    this.createPointsInput("Angesagte Stiche für", "0 Stiche", "Hinzufügen");
    this.createStartBtn("Spiel starten");
    this.infoModal("Spiel zu Ende");
    this.longPressModal();
    this.longPressModalTexts("Stiche anpassen", "", "neue Stiche Anzahl eingeben", null);
    this.resetButton();

  }

}

window.WizardUI = WizardUI;