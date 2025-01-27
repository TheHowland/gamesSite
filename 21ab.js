function addPlayer(players){
  let listView = document.getElementById("playerList")
  let count = players.size;
  let input = document.getElementById("playerName")
  let playerName = input.value;
  input.value = "";

  let playerTag = "player"+count.toString()
  let listElm = document.createElement("tbody");

  players.set(playerTag, new Player(playerName, playerTag));
  let playerTable = document.createElement("tr");

  let playerNameFiled = document.createElement('td')
  playerNameFiled.id = playerTag+" - name";
  playerNameFiled.innerText = playerName;

  let playerPointsField = document.createElement("td");
  playerPointsField.id = playerTag+" - points";
  playerPointsField.innerText = "21";


  playerTable.appendChild(playerNameFiled);
  playerTable.appendChild(playerPointsField);

  listElm.className = "dropdown-item"
  listElm.id = playerTag

  listElm.appendChild(playerTable);
  listView.appendChild(listElm);
  console.log(listElm.textContent);
}

function startGame(){
  document.getElementById("playerInputForm").style.display = 'none';
  document.getElementById("startButton").style.display = 'none';
  document.getElementById("adjustPointsButton").style.display = 'block';
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