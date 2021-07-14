import { Player } from "../models/player";

export function drawTeamCreator(
  host: HTMLElement,
  teamViewContainer: HTMLDivElement,
  inputs: HTMLInputElement[]
) {
  const teamCreatorContainer: HTMLDivElement = document.createElement("div");
  teamCreatorContainer.classList.add("teamCreatorDiv");
  host.appendChild(teamCreatorContainer);

  drawInputs(teamCreatorContainer, inputs);

  teamViewContainer.classList.add("teamViewDiv");
  teamCreatorContainer.appendChild(teamViewContainer);
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

export function drawPlayer(
  host: HTMLDivElement,
  player: Player,
  playerDetailsDiv: HTMLDivElement,
  playerNameLbl: HTMLLabelElement,
  playerStatsLbl: HTMLLabelElement
) {
  host.appendChild(playerDetailsDiv);
  playerDetailsDiv.appendChild(playerNameLbl);
  playerDetailsDiv.appendChild(playerStatsLbl);
  if (player) {
    playerDetailsDiv.style.backgroundColor = "gold";

    playerNameLbl.innerHTML = player.name;

    playerStatsLbl.innerHTML = `Pace: ${player.pace} Defending: ${player.defending} Shooting: ${player.shooting} Passing: ${player.passing}`;
  } else {
    host.appendChild(playerDetailsDiv);
    playerDetailsDiv.appendChild(playerNameLbl);
    playerNameLbl.innerHTML = "Player not found";
    playerDetailsDiv.style.backgroundColor = "red";
    playerStatsLbl.innerHTML = "";
  }
}

export function drawResults(
  opponentName: string,
  myGoals: number,
  opponentGoals: number,
  outcome: string
) {
  const host = document.querySelector(".resultsDiv");
  const resultLabel = document.createElement("label");
  host.appendChild(resultLabel);

  switch (outcome) {
    case "win":
      resultLabel.style.backgroundColor = "green";
      break;
    case "lost":
      resultLabel.style.backgroundColor = "red";
      break;
    case "draw":
      resultLabel.style.backgroundColor = "yellow";
      break;
    default:
      resultLabel.style.backgroundColor = "white";
  }

  resultLabel.innerHTML = `${myGoals}:${opponentGoals} against ${opponentName} - ${outcome}`;
}

export function createElements(
  inputFields: HTMLInputElement[],
  playerDetails: HTMLDivElement[],
  playerNameLabels: HTMLLabelElement[],
  playerStatsLabels: HTMLLabelElement[],
  teamViewContainer: HTMLDivElement,
  midDiv: HTMLDivElement,
  positionDivs: HTMLDivElement[],
  classNames: string[]
) {
  for (let i = 0; i < 5; ++i) {
    inputFields[i] = document.createElement("input");
    playerDetails[i] = document.createElement("div");
    playerDetails[i].classList.add("playerDetails");
    playerNameLabels[i] = document.createElement("label");
    playerStatsLabels[i] = document.createElement("label");
  }

  midDiv = document.createElement("div");
  midDiv.classList.add("midDiv");

  for (let i = 0; i < 5; ++i) {
    positionDivs[i] = document.createElement("div");
    positionDivs[i].classList.add(classNames[i]);
    if (classNames[i] !== "leftMidDiv" || classNames[i] !== "rightMidDiv")
      teamViewContainer.appendChild(positionDivs[i]);
    if (i === 2) teamViewContainer.appendChild(midDiv);
  }

  midDiv.appendChild(positionDivs[2]);
  midDiv.appendChild(positionDivs[3]);
}
