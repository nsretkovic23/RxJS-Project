import { drawPlayer, drawTeamCreator } from "./view/drawingFunctions";
import { Player } from "./models/player";
import { playerInputObs } from "./controllers/observables";

let inputFields: HTMLInputElement[] = [];
let playerDetails: HTMLDivElement[] = [];
let playerNameLabels: HTMLLabelElement[] = [];
let playerStatsLabels: HTMLLabelElement[] = [];
for (let i = 0; i < 5; ++i) {
  inputFields[i] = document.createElement("input");
  playerDetails[i] = document.createElement("div");
  playerDetails[i].classList.add("playerDetails");
  playerNameLabels[i] = document.createElement("label");
  playerStatsLabels[i] = document.createElement("label");
}

const teamViewContainer: HTMLDivElement = document.createElement("div");
const midDiv = document.createElement("div");
midDiv.classList.add("midDiv");
let positionDivs: HTMLDivElement[] = [];
let classNames: string[] = [
  "gkDiv",
  "defDiv",
  "leftMidDiv",
  "rightMidDiv",
  "attDiv",
];

for (let i = 0; i < 5; ++i) {
  positionDivs[i] = document.createElement("div");
  positionDivs[i].classList.add(classNames[i]);
  if (classNames[i] !== "leftMidDiv" || classNames[i] !== "rightMidDiv")
    teamViewContainer.appendChild(positionDivs[i]);
  if (i === 2) teamViewContainer.appendChild(midDiv);
}

midDiv.appendChild(positionDivs[2]);
midDiv.appendChild(positionDivs[3]);

drawTeamCreator(document.body, teamViewContainer, inputFields);

playerInputObs(inputFields[0], positionDivs[0], "goalkeepers").subscribe(
  (player: Player) =>
    drawPlayer(
      positionDivs[0],
      player,
      playerDetails[0],
      playerNameLabels[0],
      playerStatsLabels[0]
    )
);

playerInputObs(inputFields[1], positionDivs[1], "defenders").subscribe(
  (player: Player) =>
    drawPlayer(
      positionDivs[1],
      player,
      playerDetails[1],
      playerNameLabels[1],
      playerStatsLabels[1]
    )
);

playerInputObs(inputFields[2], positionDivs[2], "leftmids").subscribe(
  (player: Player) =>
    drawPlayer(
      positionDivs[2],
      player,
      playerDetails[2],
      playerNameLabels[2],
      playerStatsLabels[2]
    )
);

playerInputObs(inputFields[3], positionDivs[3], "rightmids").subscribe(
  (player: Player) =>
    drawPlayer(
      positionDivs[3],
      player,
      playerDetails[3],
      playerNameLabels[3],
      playerStatsLabels[3]
    )
);

playerInputObs(inputFields[4], positionDivs[4], "attackers").subscribe(
  (player: Player) =>
    drawPlayer(
      positionDivs[4],
      player,
      playerDetails[4],
      playerNameLabels[4],
      playerStatsLabels[4]
    )
);
