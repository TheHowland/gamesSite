function createPlayerList() {
  // <ul class="container-fluid w-100 justify-content-center" id="playerList"></ul>
  let playerList = document.createElement('ul');
  playerList.className = 'container-fluid w-100 justify-content-center';
  playerList.id = 'playerList';
  document.body.appendChild(playerList);
}

function createPlayerNameInput(placeholderInput, buttonText){
  /*
  <div id="playerInput" class="row w-100 d-flex justify-content-center align-items-center no-gutters mt-3">
    <!-- Input Column -->
    <div class="col-8 col-md-6">
      <input id="playerNameInput" type="text" placeholder="Spieler Name" value="" class="form-control">
    </div>
    <!-- Button Column -->
    <div class="col-4 col-md-2">
      <button id="addPlayerBtn" type="button" class="btn btn-primary w-100">Hinzufügen</button>
    </div>
  </div>
  */
  let playerInput = document.createElement('div');
  playerInput.id = "playerInput";
  playerInput.className = "row w-100 d-flex justify-content-center align-items-center no-gutters mt-3";

  let col1 = document.createElement('div');
  col1.className = "col-8 col-md-6";
  let input = document.createElement('input');
  input.id = "playerNameInput";
  input.type = "text";
  input.placeholder = placeholderInput;
  input.value = "";
  input.className = "form-control";
  col1.appendChild(input);

  let col2 = document.createElement('div');
  col2.className = "col-4 col-md-2";
  let button = document.createElement('button');
  button.id = "addPlayerBtn";
  button.type = "button";
  button.className = "btn btn-primary w-100";
  button.textContent = buttonText;
  col2.appendChild(button);

  playerInput.appendChild(col1);
  playerInput.appendChild(col2);

  document.body.appendChild(playerInput);
}

function createPointsInput(labelText, inputPlaceholder, btnText,div = null) {
  /*
  <label id="PlayerNameNI">Stiche für </label>
  <div id="adjustScore" className="row w-100 d-flex justify-content-center align-items-center no-gutters mt-3">
    <!-- Input Column -->
    <div className="col-6 col-md-6">
      <input id="numberInput" type="number" placeholder="0 Stiche" value="" className="form-control" />
    </div>
    <div className="col-2 col-md-1">
      <img id="HeartPicture" name="heartX2.svg" src="src/resources/heartX2.svg" className="img-fluid" alt="x2" />
    </div>
    <!-- Button Column -->
    <div className="col-4 col-md-2">
      <button id="adjustPointsBtn" type="button" className="btn btn-primary w-100">Hinzufügen</button>
    </div>
  </div>
  */
  let label = document.createElement('label');
  label.textContent = labelText;
  label.id = "PlayerNameNI";
  document.body.appendChild(label);

  let adjustScore = document.createElement('div');
  adjustScore.id = "adjustScore";
  adjustScore.className = "row w-100 d-flex justify-content-center align-items-center no-gutters mt-3";

  let col1 = document.createElement('div');
  col1.className = "col-6 col-md-6";
  let input = document.createElement('input');
  input.id = "numberInput";
  input.placeholder = inputPlaceholder
  input.type = "number";
  input.value = "";
  input.className =  "form-control";
  col1.appendChild(input);

  let col2 = document.createElement('div');
  col2.className = "col-4 col-md-2";
  let button = document.createElement('button');
  button.id = "adjustPointsBtn";
  button.type = "button";
  button.className = "btn btn-primary w-100";
  button.textContent = btnText;
  col2.appendChild(button);

  adjustScore.appendChild(col1);
  if(div){
    adjustScore.appendChild(div);
  }
  adjustScore.appendChild(col2);

  document.body.appendChild(adjustScore);
}

function createStartBtn(btnText){
  /*
  <div id="startButton" class="d-flex justify-content-center w-100 mt-3">
  <button type="button" class="btn btn-primary w-50">Spiel starten</button>
  </div>
   */
  let startButton = document.createElement('div');
  startButton.id = "startButton";
  startButton.className = "d-flex justify-content-center w-100 mt-3";

  let button = document.createElement('button');
  button.type = "button";
  button.className = "btn btn-primary w-50";
  button.textContent = btnText;

  startButton.appendChild(button);
  document.body.appendChild(startButton);
}