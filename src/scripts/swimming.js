class Swimming extends gameBase{
  ui = null;
  pointsFieldName = null;
  constructor() {
    super(3, "Stiche für ",
      ["Name", "Leben", "Wild"],
      ["col-6", "col-3", "col-3"],
      "Stiche für ");
    this.ui = new SwimmingUI(this.colHeadings, this.colSpacings);
    this.pointsFieldName = this.colHeadings[1].toLowerCase();
  }

  startGame() {
    // Hide the input form and start button
    document.getElementById("playerInput").classList.add("d-none");
    document.getElementById("startButtonDiv").classList.add("d-none");

    document.getElementById("lostBtn").classList.remove("d-none");
    document.getElementById("fireBtn").classList.remove("d-none");
    for (let player of Array.from(this.players.keys())){
      this.ui.boar(player, this.toggleBoarPicture.bind(this));
      document.getElementById(player + " - BoarPicture").classList.add('d-none');
    }
  }

  adjustPoints(){
    let selectedPlayer = document.getElementsByClassName('selected');
    for (let player of selectedPlayer){
      let isWild = !document.getElementById(player.id + ' - BoarPicture').classList.contains('d-none');
      let elm = document.getElementById(player.id + ' - ' + this.pointsFieldName);
      elm.innerHTML =  this.players.get(player.id).adjustPoints(-1 - 1 * Boolean(isWild));
      if (this.players.get(player.id).points === 0){
        elm.innerHTML = "🏊‍♀️";
        elm.style.padding = "0";
        elm.style.fontSize = "x-large";
      }
      if (this.players.get(player.id).points < 0){
        player.classList.add('d-none');
      }
    }

    this.endGame();

    this.resetBackgroundColor('playerTableBody', 'table-info');
    this.resetWild();
  }

  endGame(){
    let isEnding = false;
    let countPlayers = 0;
    let winningPlayer ="";

    for (let player of Array.from(this.players.keys())){
      if (this.players.get(player).points >= 0){
        countPlayers++;
        winningPlayer = this.players.get(player).name;
      }
    }
    if (countPlayers === 1){
      isEnding = true;
    }

    if (isEnding){
      this.ui.infoModalTexts("Spiel beendet", "Gewonnen hat: " + winningPlayer + "\n");
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

  toggleBoarPicture(event){
    let playerID = event.target.closest('tr').id
    let boarPicture = document.getElementById(playerID + " - BoarPicture");
    if (boarPicture.classList.contains('d-none')){
      boarPicture.classList.remove('d-none');
    }
    else{
      boarPicture.classList.add('d-none');
    }
    this.setFocusToElementID('numberInput');
  }

  fire(){
    let selectedPlayer = this.getSelectedPlayer();
    if (document.getElementsByClassName('selected').length > 1){
      this.ui.infoModalTexts("Fehler", "Bitte nur den Spieler auswählen der Feuer hat");
      let myModal = new bootstrap.Modal(document.getElementById('infoModal'));
      myModal.show();
      return;
    }

    for (let player of Array.from(this.players.keys())){
      if (player !== selectedPlayer){
        let isWild = !document.getElementById(player + ' - BoarPicture').classList.contains('d-none');
        document.getElementById(player + ' - ' + this.pointsFieldName).innerHTML =  this.players.get(player).adjustPoints(-1 - 1 * Boolean(isWild));
        if (this.players.get(player).points < 0){
          document.getElementById(player).classList.add('d-none');
        }
      }
    }
    this.resetBackgroundColor('playerTableBody', 'table-info');
    this.resetWild();
  }

  resetWild(){
    for (let player of Array.from(this.players.keys())){
      document.getElementById(player + ' - BoarPicture').classList.add('d-none');
    }
  }

  resetGame(){
    for (let player of Array.from(this.players.keys())){
      super.resetPlayer(player, player + ' - ' + this.pointsFieldName);
      document.getElementById(player).classList.remove('d-none');
      let elm = document.getElementById(player + ' - ' + this.pointsFieldName)
      elm.style.padding = "";
      elm.style.fontSize = "";
    }
  }

  setUp(){
    this.ui.navbar("Schwimmen");
    this.ui.createPlayerTable(this.multiSelectRowEvent.bind(this), this.longHold, this.correctPoints.bind(this));
    this.ui.longPressModalTexts("Punkte anpassen", "", "neue Punkte eingeben", null);

    this.ui.createPlayerNameInput("Spieler Name", "Hinzufügen",
      this.addPlayerToTable.bind(this)
    );
    this.ui.pointsInput("Stiche für ", "0 Stiche", "Hinzufügen",
      this.adjustPoints.bind(this),
      null,
      null
    );
    this.ui.startBtn("Spiel starten", this.startGame.bind(this));
    this.ui.infoModal();
    this.ui.lostAndFireBtns(this.adjustPoints.bind(this), this.fire.bind(this));
    this.ui.resetButton(this.resetGame.bind(this));
  }
}
window.Swimming = Swimming;

class SwimmingUI extends UIElements{
  boar(playerID, eventFkt){
    let emoji = document.createElement("div");
    emoji.id = playerID + " - BoarPicture";
    emoji.style.fontSize = "x-large";
    emoji.innerHTML = "🐗";
    emoji.alt="wild";

    let boarElem = document.getElementById(playerID + ' - wild');
    boarElem.style.padding = "0";
    boarElem.appendChild(emoji);
    boarElem.addEventListener('click', eventFkt);
  }

  lostAndFireBtns(lostFkt, fireFkt){
    let lost = this.btnFaktory("lostBtn", "Verloren", "btn btn-primary w-50 d-none");
    let fire = this.btnFaktory("fireBtn", "Feuer", "btn btn-primary w-50 d-none");

    let div = document.createElement('div')
    div.classList.add('mt-3')
    div.appendChild(lost);
    div.appendChild(fire);

    lost.addEventListener('click', lostFkt);
    fire.addEventListener('click', fireFkt);

    document.body.appendChild(div);
  }
}
window.SwimmingUI = SwimmingUI;