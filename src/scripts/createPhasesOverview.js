let phases = [
  "Zwei Drillinge",
  "Ein Drilling + eine Viererfolge",
  "Ein Vierling + eine Viererfolge",
  "Eine Siebenerfolge",
  "Eine Achterfolge",
  "Eine Neunerfolge",
  "Zwei Vierlinge",
  "Sieben Karten einer Farbe",
  "Ein Fünfling + ein Zwilling",
  "Ein Fünfling + ein Drilling"
];

function createPhasesOverview(){
  let heading = document.createElement("h1");
  heading.innerText = "Phasen:";
  document.body.appendChild(heading)

  phases.forEach((phase) => {
    let div = document.createElement("div");
    div.className = "form-check px-5";
    let label = document.createElement("label")
    label.className = "form-check-label";
    label.innerText = phase
    div.appendChild(label);

    let input = document.createElement("input");
    input.className = "form-check-input";
    input.type = "checkbox";
    input.value = "";
    div.appendChild(input);
    document.body.appendChild(div);
  })
}