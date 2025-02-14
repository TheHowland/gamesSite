class SavedPlayers extends gameBase{
  ui = null;
  constructor() {
    super(21, "Stiche für ",
      ["Name"],
      ["col-12"],
      "Stiche für ");
    this.ui = new SavedPlayersUI(this.colHeadings, this.colSpacings);
  }

  addPlayerToTable() {
    super.addPlayerToTable();
    document.getElementById('playerNameInput').focus();
    let playerName = this.players.get(Array.from(this.players.keys()).pop()).name;
    let playerNames = this.getSavedPlayersString();
    this.savePlayers(playerNames + playerName + "~");
  }

  toggleRowSelectionEvent(event, ElementID, classListArg) {
    super.toggleRowSelectionEvent(event, ElementID, classListArg);
    let playerID = this.getSelectedPlayer();
    let body = "Entfernt den Spieler " + this.players.get(playerID).name +  " aus der liste der gespeicherten spieler"
    this.ui.longPressModalTexts("Spieler etfernen?", body, "", null);
  }

  getSavedPlayersString(){
    let match = document.cookie.match("SavedPlayers=(?<playerNames>.*);*$")
    if (match !== null){
      return match.groups.playerNames;
    }
    else{
      return "";
    }
  }

  removePlayer(){
    let playerID = this.getSelectedPlayer();
    let playerNames = this.getSavedPlayersString();
    let newPlayerNames = playerNames.replace(this.players.get(playerID).name+"~", "");
    this.savePlayers(newPlayerNames);
    this.players.delete(playerID);
    let table = document.getElementById('playerTableBody');
    table.removeChild(document.getElementById(playerID));
  }

  savePlayers(playersStr){
    let myDate = new Date();
    myDate.setMonth(myDate.getMonth() + 12);
    document.cookie = "SavedPlayers=" + playersStr + ";expires=" + myDate.toUTCString() + ";path=/";
    console.log(document.cookie);
  }

  setUp(){
    this.ui.setUp(
      "Gespeicherte Spieler",
      this.toggleRowSelectionEvent.bind(this), this.resetBackgroundColor.bind(this), this.longHold,  this.removePlayer.bind(this),
      this.addPlayerToTable.bind(this),
      ()=>{},
      ()=>{},
      ()=>{},
    );
    document.getElementById('startButton').classList.add('d-none');
    this.ui.playerNameInputTexts("Spieler Name", "Hinzufügen");
    this.ui.setPointsInputTexts("", "", "",)
    this.ui.longPressModalTexts("Spieler etfernen?", "Entfernt den Spieler aus der liste der gespeicherten spieler", "", null);
    document.getElementById('longPressModalInput').classList.add('d-none');

    let playerNames = this.getSavedPlayersString();
    for (let player of playerNames.split("~")){
      if (player === ""){
        continue;
      }
      document.getElementById('playerNameInput').value = player;
      super.addPlayerToTable()
    }
    document.getElementById('savedPlayersNavBar').classList.add('d-none');
  }
}
window.SavedPlayers = SavedPlayers;

class SavedPlayersUI extends UIElements{

}
window.SavedPlayersUI = SavedPlayersUI;