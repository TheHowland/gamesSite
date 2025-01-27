function addPlayer(players) {
  let listView = document.getElementById("playerList");
  let count = players.size;
  let input = document.getElementById("playerNameInput");
  let playerName = input.value.trim();
  input.value = "";

  if (playerName) {
    let playerTag = "player" + count.toString();
    let listElm = document.createElement("li");

    players.set(playerTag, new Player(playerName, playerTag));

    let playerRow = document.createElement("div");
    playerRow.className = "row";

    let playerNameField = document.createElement('div');
    playerNameField.className = "col-8 col-md-6";
    playerNameField.id = playerTag + " - name";
    playerNameField.innerText = playerName;

    let playerPointsField = document.createElement("div");
    playerPointsField.className = "col-4 col-md-3"
    playerPointsField.id = playerTag + " - points";
    playerPointsField.innerText = "21";

    playerRow.appendChild(playerNameField);
    playerRow.appendChild(playerPointsField);

    listElm.className = "dropdown-item";
    listElm.id = playerTag;

    listView.appendChild(playerRow);
  }
}

function startGame() {
  // Hide the input form and start button
  document.getElementById("playerInput").classList.add("d-none");
  document.getElementById("startButton").classList.add("d-none");

  // Show the adjust points button
  document.getElementById("adjustPointsButton").classList.remove("d-none");
}


async function adjustAllPoints(players){
  for(let [id, player] of players){
    let name = await player.name;
    await player.adjustPoints(-5);
    console.log(name + ": " + player.points);
  }
}

class Player{
  tagName = null
  name = null;
  points = 0;

  constructor(name, tagName){
    this.name = name;
    this.points = 21;
    this.tagName = tagName
  }

  adjustPoints(points){
    this.points += points;
    document.getElementById(this.tagName + " - points").innerHTML = this.points
  }
}