class UIElements{
  colHeadings = null;
  colSpacings = null;

  constructor(colHeadings, colSpacings){
  this.colHeadings = colHeadings;
  this.colSpacings = colSpacings;
  this.modalHeading = "Punkte korrigieren";
  }

  createPlayerList() {
    // <ul class="container-fluid w-100 justify-content-center" id="playerList"></ul>
    let playerList = document.createElement('ul');
    playerList.className = 'container-fluid w-100 justify-content-center';
    playerList.id = 'playerList';
    document.body.appendChild(playerList);
  }

  createPlayerTable() {

    if (this.colHeadings.length !== this.colSpacings.length) {
      console.log("Error: Headings and Spacing must be the same length");
      return;
    }

    let tableContainer = document.createElement('div');
    tableContainer.id = 'playerTableContainer';
    tableContainer.className = 'container-fluid w-100 justify-content-center';
    let table = document.createElement('table');
    table.id = 'playerTable';
    table.className = 'table borderless table-striped';

    let tableHeadRow = document.createElement('tr');
    tableHeadRow.className = 'row-col-' + this.colHeadings.length.toString();

    let tableHead = document.createElement('thead');
    for (let i = 0; i < this.colHeadings.length; i++) {
        let heading = document.createElement('th');
        heading.innerText = this.colHeadings[i];
        heading.className = this.colSpacings[i];
        tableHeadRow.appendChild(heading);
    }

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
    startButton.id = "startButtonDiv";
    startButton.className = "d-flex justify-content-center w-100 mt-3";

    let button = document.createElement('button');
    button.type = "button";
    button.id = "startButton"
    button.className = "btn btn-primary w-50";
    button.textContent = btnText;

    startButton.appendChild(button);
    document.body.appendChild(startButton);
  }

  infoModal() {
    /*

    */
    let modal = document.createElement('div');
    modal.className = "modal fade";
    modal.id = "infoModal";
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
    h1.id = "infoModalHeading";
    h1.textContent = "ElementID - infoModalHeading";
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
    h5.id = "infoModalText";
    h5.textContent = "ElementID - infoModalText";
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

  infoModalTexts(heading, body){
    if (heading !== null){
      document.getElementById('infoModalHeading').textContent = heading;
    }
    if (body !== null){
      document.getElementById('infoModalText').textContent = body;
    }
  }

  longPressModalTexts(heading, body, placeholder, value){
    if (heading !== null){
      document.getElementById('longPressModalHeading').textContent = heading;
    }
    if (body !== null){
      document.getElementById('longPressModalText').textContent = body;
    }
    if (placeholder !== null){
      document.getElementById('longPressModalInput').placeholder = placeholder;
    }
    if (value !== null){
      document.getElementById('longPressModalInput').value = value;
    }
  }

  okModalTexts(heading, body, placeholder, value){
    if (heading !== null){
      document.getElementById('okModalHeading').textContent = heading;
    }
    if (body !== null){
      document.getElementById('okModalText').textContent = body;
    }
  }

  inputLongPressModal(){
    document.getElementById('longPressModalInput');
  }

  longPressModal() {
    let modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'longPressModal';
    modal.setAttribute('data-bs-backdrop', 'static');
    modal.setAttribute('data-bs-keyboard', 'false');
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'staticBackdropLabel');
    modal.setAttribute('aria-hidden', 'true');

    let modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog';

    let modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    let modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    let h1 = document.createElement('h1');
    h1.className = 'modal-title fs-5';
    h1.id = 'longPressModalHeading';
    h1.textContent = "";

    /*
    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>;
    <button type="button" className="btn btn-primary">Save changes</button>;
    */
    let buttonClose = document.createElement('button');
    buttonClose.type = 'button';
    buttonClose.className = 'btn-close';
    buttonClose.setAttribute('data-bs-dismiss', 'modal');
    buttonClose.setAttribute('aria-label', 'Close');

    modalHeader.appendChild(h1);
    modalHeader.appendChild(buttonClose);

    let modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    let h5 = document.createElement('h6');
    h5.id = 'longPressModalText';
    h5.textContent = "";
    modalBody.appendChild(h5);
    let input = document.createElement('input');
    input.type = 'number';
    input.id = 'longPressModalInput';
    input.className = 'form-control';
    input.placeholder = '';
    modalBody.appendChild(input);

    let modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    let buttonCancle = document.createElement('button');
    buttonCancle.type = 'button';
    buttonCancle.className = 'btn btn-cancel';
    buttonCancle.setAttribute('data-bs-dismiss', 'modal');
    buttonCancle.textContent = 'Abbrechen';

    let saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.className = 'btn btn-primary';
    saveButton.setAttribute('data-bs-dismiss', 'modal');
    saveButton.textContent = 'Okay';
    saveButton.id = 'longPressModalSaveBtn';

    modalFooter.appendChild(buttonCancle);
    modalFooter.appendChild(saveButton);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    document.body.appendChild(modal);
  }

  okModal() {
    let modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'okModal';
    modal.setAttribute('data-bs-backdrop', 'static');
    modal.setAttribute('data-bs-keyboard', 'false');
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'staticBackdropLabel');
    modal.setAttribute('aria-hidden', 'true');

    let modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog';

    let modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    let modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    let h1 = document.createElement('h1');
    h1.className = 'modal-title fs-5';
    h1.id = 'okModalHeading';
    h1.textContent = "";

    /*
    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>;
    <button type="button" className="btn btn-primary">Save changes</button>;
    */
    let buttonClose = document.createElement('button');
    buttonClose.type = 'button';
    buttonClose.className = 'btn-close';
    buttonClose.setAttribute('data-bs-dismiss', 'modal');
    buttonClose.setAttribute('aria-label', 'Close');

    modalHeader.appendChild(h1);
    modalHeader.appendChild(buttonClose);

    let modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    let h5 = document.createElement('h6');
    h5.id = 'okModalText';
    h5.textContent = "";
    modalBody.appendChild(h5);

    let modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    let buttonCancle = document.createElement('button');
    buttonCancle.type = 'button';
    buttonCancle.className = 'btn btn-cancel';
    buttonCancle.setAttribute('data-bs-dismiss', 'modal');
    buttonCancle.textContent = 'Abbrechen';

    let saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.className = 'btn btn-primary';
    saveButton.setAttribute('data-bs-dismiss', 'modal');
    saveButton.textContent = 'Okay';
    saveButton.id = 'okModalSaveBtn';

    modalFooter.appendChild(buttonCancle);
    modalFooter.appendChild(saveButton);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    document.body.appendChild(modal);
  }

  navbar(){
    /*
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="#">Spiel: 21ab</a>
          <div class="navbar-collapse collapse" id="navbarNavAltMarkup" style="">
            <div class="navbar-nav">
              <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
              <a class="nav-item nav-link" href="#">Features</a><a class="nav-item nav-link" href="#">Pricing</a>
              <a class="nav-item nav-link disabled" href="#">Disabled</a>
            </div>
          </div>
        </nav>
    */
    let navbar = document.createElement('nav');
    navbar.className = 'navbar navbar-expand-lg navbar-light bg-light';
    let button = document.createElement('button');
    button.className = 'navbar-toggler collapsed';
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'collapse');
    button.setAttribute('data-bs-target', '#navbarNavAltMarkup');
    button.setAttribute('aria-controls', 'navbarNavAltMarkup');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Toggle navigation');
    let span = document.createElement('span');
    span.className = 'navbar-toggler-icon';
    button.appendChild(span);
    navbar.appendChild(button);
    let a = document.createElement('a');
    a.className = 'navbar-brand';
    a.id = 'navbarBrand';
    a.href = '#';
    a.innerText = 'SetTextViaElementID-navbarBrand';
    navbar.appendChild(a);
    let div = document.createElement('div');
    div.className = 'navbar-collapse collapse';
    div.id = 'navbarNavAltMarkup';
    let navLinkDiv = document.createElement('div');
    navLinkDiv.className = 'navbar-nav';
    div.appendChild(navLinkDiv);
    let navLink1 = document.createElement('a');
    navLink1.className = 'nav-item nav-link active';
    navLink1.href = 'index.html';
    navLink1.innerText = "Home";
    navLinkDiv.appendChild(navLink1);

    navbar.appendChild(div);
    document.body.appendChild(navbar);
  }

  resetButton(){
    let resetBtnDiv = document.createElement('div');
    resetBtnDiv.className = "d-flex justify-content-center w-100 mt-3";

    let resetBtn = document.createElement('button');
    resetBtn.type = "button";
    resetBtnDiv.id = "resetButton";
    resetBtn.className = "btn btn-primary w-50";
    resetBtn.textContent = "Reset";

    resetBtnDiv.appendChild(resetBtn);
    document.body.appendChild(resetBtnDiv);
  }
}

window.UIElements = UIElements;