class TwentyOneDown extends gameBase{
  constructor(pointsInfoText) {
    super(pointsInfoText);
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

    this.players.get(selectedPlayer).adjustPoints(points);
    this.endGame();

    this.selectNextPlayer(selectedPlayer);
    this.setFocusToElementID('numberInput');
  }

  endGame(){
    let isEnding = false;

    let modalBody = ""
    let sortedPlayers = Array.from(this.players.values()).sort((player1, player2) => player1.points - player2.points);
    let winningPlayer = "";

    for (let player of sortedPlayers){
      if (player.points === 0){
        isEnding = true;
        winningPlayer = player.name
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

  setUp21ab(){
    document.getElementById("adjustScore").classList.add("d-none");
    document.getElementById("PlayerNameNI").classList.add("d-none");

    document.getElementById('playerList').addEventListener('click', this.toggleRowSelectionEvent.bind(this));
    document.getElementById('HeartPicture').addEventListener('click', this.toggleHeratPicture.bind(this));
    document.getElementById('addPlayerBtn').addEventListener('click', this.addPlayer.bind(this));
    document.getElementById('adjustPointsBtn').addEventListener('click', this.adjustPoints.bind(this));
    document.getElementById('startButton').addEventListener('click', this.startGame.bind(this, this.players));
  }
}

window.twentyOneDown = TwentyOneDown;