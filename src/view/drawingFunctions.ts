export function drawTeamCreator(host: HTMLElement, inputs: HTMLInputElement[]) {
  const teamCreatorContainer: HTMLDivElement = document.createElement("div");
  teamCreatorContainer.classList.add("teamCreatorDiv");
  host.appendChild(teamCreatorContainer);

  drawInputs(teamCreatorContainer, inputs);

  drawTeamView(teamCreatorContainer);
}

function drawInputs(host: HTMLElement, inputs: HTMLInputElement[]) {
  const inputsContainer: HTMLDivElement = document.createElement("div");
  inputsContainer.classList.add("inputsDiv");
  host.appendChild(inputsContainer);
  const labelValues = [
    "Goalkeeper",
    "Defender",
    "Left Midfielder",
    "Right Midfielder",
    "Attacker",
  ];

  inputs.forEach((inputField, ind) => {
    const inputAndLabelDiv: HTMLDivElement = document.createElement("div");
    inputAndLabelDiv.classList.add("inputAndLabelDiv");
    inputsContainer.appendChild(inputAndLabelDiv);

    const inputLabel: HTMLLabelElement = document.createElement("label");
    inputLabel.innerHTML = labelValues[ind];
    inputAndLabelDiv.appendChild(inputLabel);

    inputAndLabelDiv.appendChild(inputField);
  });
}

function drawTeamView(host:HTMLDivElement){
    const teamViewContainer:HTMLDivElement = document.createElement("div");
    teamViewContainer.classList.add("teamViewDiv");
    host.appendChild(teamViewContainer);
}
