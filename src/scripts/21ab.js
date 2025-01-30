class TwentyOneDown extends gameBase{
  ui = null;
  pointsFieldName = null;
  constructor() {
    super(21, "Stiche für ",
      ["Name", "Punkte"],
      ["col-8 col-md-6", "col-4 col-md-3"]);
    this.ui = new TwentyOneDownUI(this.colHeadings, this.colSpacings);
    this.pointsFieldName = this.colHeadings[1].toLowerCase();
  }

  startGame() {
    // Hide the input form and start button
    document.getElementById("playerInput").classList.add("d-none");
    document.getElementById("startButton").classList.add("d-none");

    document.getElementById("adjustScore").classList.remove('d-none');
    document.getElementById("PlayerNameNI").classList.remove("d-none");
    this.toggleRowSelection('player0', 'playerTableBody', 'table-info');
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

      modalBody += player.name + " - " + player.points +"\n";
      console.log(player.points);
      console.log(player.name);
      console.log("-------")
    }

    if (isEnding){
      document.getElementById('modalText').innerText = "Gewonnen hat: " + winningPlayer + "\n" + modalBody;
      let myModal = new bootstrap.Modal(document.getElementById('winModal'));
      myModal.show();
    }
  }

  addPlayer() {
    let listView = document.getElementById('playerList');
    let count = this.players.size;
    let input = document.getElementById('playerNameInput');
    let playerName = input.value.trim();
    input.value = '';

    if (playerName) {
      let playerTag = 'player' + count.toString();
      let listElm = document.createElement('li');

      this.players.set(playerTag, new Player(playerName, playerTag, this.startPoints));

      let playerRow = document.createElement('div');
      playerRow.className = 'row';
      playerRow.id = playerTag;

      let playerNameField = document.createElement('div');
      playerNameField.className = 'col-8 col-md-6';
      playerNameField.id = playerTag + ' - ' + this.colHeadings[0].toLowerCase();
      playerNameField.innerText = playerName;

      let playerPointsField = document.createElement('div');
      playerPointsField.className = 'col-4 col-md-3';
      playerPointsField.id = playerTag + ' - ' + this.colHeadings[1].toLowerCase();
      playerPointsField.innerText = this.startPoints.toString();

      playerRow.appendChild(playerNameField);
      playerRow.appendChild(playerPointsField);

      listElm.className = 'dropdown-item';
      listElm.id = playerTag;

      listView.appendChild(playerRow);
      this.setFocusToElementID('playerNameInput');
    }
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
    document.getElementById('HeartPicture').addEventListener('click', this.toggleHeratPicture.bind(this));
    document.getElementById('addPlayerBtn').addEventListener('click', this.addPlayerToTable.bind(this));
    document.getElementById('adjustPointsBtn').addEventListener('click', this.adjustPoints.bind(this));
    document.getElementById('startButton').addEventListener('click', this.startGame.bind(this, this.players));
  }
}
window.TwentyOneDown = TwentyOneDown;

class TwentyOneDownUI extends UIElements{
  setUp(){
    this.createHeading("Spiel: 21ab");
    this.createPlayerTable();
    this.createPlayerNameInput("Spieler Name", "Hinzufügen");

    let heartPicture = document.createElement("div")
    heartPicture.className = "col-2 col-md-1";
    let img = document.createElement("img");
    img.id = "HeartPicture";
    img.name="heartX2.svg";
    img.src="src/resources/heartX2.svg";
    img.className="img-fluid";
    img.alt="x2";
    heartPicture.appendChild(img);

    this.createPointsInput("Stiche für ", "0 Stiche", "Hinzufügen", heartPicture);
    this.createStartBtn("Spiel starten");
    this.addModal("Spiel zu Ende");
  }
}
window.TwentyOneDownUI = TwentyOneDownUI;