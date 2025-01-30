class Wizard extends gameBase{
  ui = null;
  pointsFieldName = null;
  playerStiche = new Map();
  roundNumber = 0;

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

    let playerID = Array.from(this.players.keys())[this.roundNumber % this.players.size];
    this.toggleRowSelection(playerID, 'playerTableBody', 'table-info');
  }

  toggleStartAndEvalRound(){
    let strartBtn = document.getElementById("startButton");
    if (strartBtn.childNodes[0].textContent === "Stiche einloggen"){
      let adjustPointsBtn = document.getElementById("adjustPointsBtn");
      adjustPointsBtn.removeEventListener('click', this.adjustSticheHandler);
      adjustPointsBtn.addEventListener('click', this.adjustPointsHandler);
      document.getElementById("PlayerNameNI").innerText = "Tatsächliche Stiche von ";
      this.inputExplText = "Tatsächliche Stiche von ";
      strartBtn.childNodes[0].textContent = "Runde abschließen";
    }
    else{
      let adjustPointsBtn = document.getElementById("adjustPointsBtn");
      adjustPointsBtn.removeEventListener('click', this.adjustPointsHandler);
      adjustPointsBtn.addEventListener('click', this.adjustSticheHandler);
      strartBtn.childNodes[0].textContent = "Stiche einloggen";

      document.getElementById("PlayerNameNI").innerText = "Angesagte Stiche von ";
      this.inputExplText = "Angesagte Stiche von ";

      //reset Stiche in table
      for (let playerID of Array.from(this.playerStiche.keys())){
        this.playerStiche.set(playerID, 0);
        document.getElementById(playerID + ' - ' + this.sticheFieldName).innerText = '-';
      }

      //select new player to start with Stiche announcing
      this.roundNumber += 1;
      document.getElementById('roundNumber').innerText = "Runde: " + (this.roundNumber + 1).toString();
      let playerID = Array.from(this.players.keys())[this.roundNumber % this.players.size];
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

  endGame(){

  }

  adjustStiche(){
    let stiche = this.getNumberInput();
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
    document.getElementById('addPlayerBtn').addEventListener('click', this.addPlayerToTable.bind(this));
    document.getElementById('adjustPointsBtn').addEventListener('click', this.adjustSticheHandler);
    document.getElementById('startButton').addEventListener('click', this.startGameHandler);
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

  setUp(){
    this.createHeading("Spiel: Wizard");
    this.roundNumber();
    this.createPlayerTable(this.colHeadings, this.colSpacings);
    this.createPlayerNameInput("Spieler Name", "Hinzufügen");

    this.createPointsInput("Angesagte Stiche für", "0 Stiche", "Hinzufügen");
    this.createStartBtn("Spiel starten");
    this.addModal("Spiel zu Ende");
  }

}

window.WizardUI = WizardUI;