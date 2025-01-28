class Player{
  playerID = null
  name = null;
  points = 0;

  constructor(name, playerID){
    this.name = name;
    this.points = 21;
    this.playerID = playerID
  }

  adjustPoints(points){
    this.points += points;
    document.getElementById(this.playerID + " - points").innerHTML = this.points
  }
}

window.Player = Player;