class UIElements{
  constructor() {
  }

  createPlayerList() {
    // <ul class="container-fluid w-100 justify-content-center" id="playerList"></ul>
    let playerList = document.createElement('ul');
    playerList.className = 'container-fluid w-100 justify-content-center';
    playerList.id = 'playerList';
    document.body.appendChild(playerList);
  }

  createPlayerTable() {
    let tableContainer = document.createElement('div');
    tableContainer.id = 'playerTableContainer';
    tableContainer.className = 'container-fluid w-100 justify-content-center';
    let table = document.createElement('table');
    table.id = 'playerTable';
    table.className = 'table borderless table-striped';

    let tableHead = document.createElement('thead');
    let tableHeadRow = document.createElement('tr');
    let tableHeadName = document.createElement('th');
    tableHeadName.innerText = "Name";
    let tableHeadPoints = document.createElement('th');
    tableHeadPoints.innerText = "Punkte";
    let tableHeadStiche = document.createElement('th');
    tableHeadStiche.innerText = "Stiche";
    tableHeadRow.appendChild(tableHeadName);
    tableHeadRow.appendChild(tableHeadPoints);
    tableHeadRow.appendChild(tableHeadStiche);

    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);

    let tableBody = document.createElement('tbody');
    tableBody.id = 'playerTableBody';
    table.appendChild(tableBody);

    tableContainer.appendChild(table)

    document.body.appendChild(tableContainer);
  }

  createHeading(headingText){
    let heading = document.createElement('h1');
    heading.innerText = headingText;
    document.body.appendChild(heading);
  }

  createPlayerNameInput(placeholderInput, buttonText){
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

  createPointsInput(labelText, inputPlaceholder, btnText,div = null) {
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

  createStartBtn(btnText){
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

  addModal(modalHeading, modalText = "") {
    /*

    */
    let modal = document.createElement('div');
    modal.className = "modal fade";
    modal.id = "winModal";
    modal.setAttribute("data-bs-backdrop", "static");
    modal.setAttribute("data-bs-keyboard", "false");
    modal.tabIndex = "-1";
    modal.setAttribute("aria-labelledby", "staticBackdropLabel");
    modal.setAttribute("aria-hidden", "true");

    let modalDialog = document.createElement('div');
    modalDialog.className = "modal-dialog";

    let modalContent = document.createElement('div');
    modalContent.className = "modal-content";
    let modalHeader = document.createElement('div');
    modalHeader.className = "modal-header";
    let h1 = document.createElement('h1');
    h1.className = "modal-title fs-5";
    h1.id = "modalHeading";
    h1.textContent = modalHeading;
    let button = document.createElement('button');
    button.type = "button";
    button.className = "btn-close";
    button.setAttribute("data-bs-dismiss", "modal");
    button.setAttribute("aria-label", "Close");

    modalHeader.appendChild(h1);
    modalHeader.appendChild(button);

    let modalBody = document.createElement('div');
    modalBody.className = "modal-body";
    let h5 = document.createElement('h6');
    h5.id = "modalText";
    h5.textContent = modalText;
    modalBody.appendChild(h5);

    let modalFooter = document.createElement('div');
    modalFooter.className = "modal-footer";
    let understoodButton = document.createElement('button');
    understoodButton.type = "button";
    understoodButton.className = "btn btn-primary";
    understoodButton.setAttribute("data-bs-dismiss", "modal");
    understoodButton.textContent = "Okay";

    modalFooter.appendChild(understoodButton);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    document.body.appendChild(modal);

  }

}

