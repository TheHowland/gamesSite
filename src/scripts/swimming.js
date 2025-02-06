class Swimming extends gameBase{
  ui = null;
  pointsFieldName = null;
  constructor() {
    super(3, "Stiche für ",
      ["Name", "Leben", "Wild"],
      ["col-7", "col-1", "col-4"],
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
    }
  }

  adjustPoints(){
    let selectedPlayer = document.getElementsByClassName('selected');
    for (let player of selectedPlayer){
      let isWild = !document.getElementById(player.id + ' - BoarPicture').classList.contains('d-none');
      document.getElementById(player.id + ' - ' + this.pointsFieldName).innerHTML =  this.players.get(player.id).adjustPoints(-1 - 1 * Boolean(isWild));
      if (this.players.get(player.id).points <= 0){
        player.classList.add('d-none');
      }
    }

    this.endGame();

    this.resetBackgroundColor('playerTableBody', 'table-info');
    this.resetWild();
  }

  endGame(){
    let isEnding = false;

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
      this.ui.infoModalTexts("Fehler", "Bitte nur einen Spieler auswählen");
      let myModal = new bootstrap.Modal(document.getElementById('infoModal'));
      myModal.show();
      return;
    }
    console.log("Dont adjust points for " + selectedPlayer)
    for (let player of Array.from(this.players.keys())){
      if (player !== selectedPlayer){
        let isWild = !document.getElementById(player + ' - BoarPicture').classList.contains('d-none');
        document.getElementById(player + ' - ' + this.pointsFieldName).innerHTML =  this.players.get(player).adjustPoints(-1 - 1 * Boolean(isWild));
      }
    }
    this.resetBackgroundColor();
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
    let boarPicture = document.createElement("div")
    boarPicture.className = "col-3";
    let img = document.createElement("img");
    img.id = playerID + " - BoarPicture";
    img.name="boar";
    img.src="src/resources/boarFill.svg";
    img.className="img-fluid d-none";
    img.alt="wild";
    boarPicture.appendChild(img);

    let boarElem = document.getElementById(playerID + ' - wild');
    boarElem.appendChild(boarPicture);
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