import {
  createElements,
  drawResults,
  drawTeamCreator,
} from "./view/drawingFunctions";
import { makeTeamObs } from "./controllers/observables";

let inputFields: HTMLInputElement[] = [];
let playerDetails: HTMLDivElement[] = [];
let playerNameLabels: HTMLLabelElement[] = [];
let playerStatsLabels: HTMLLabelElement[] = [];

let teamViewContainer: HTMLDivElement = document.createElement("div");

let midDiv: HTMLDivElement;

let positionDivs: HTMLDivElement[] = [];
let classNames: string[] = [
  "gkDiv",
  "defDiv",
  "leftMidDiv",
  "rightMidDiv",
  "attDiv",
];

createElements(
  inputFields,
  playerDetails,
  playerNameLabels,
  playerStatsLabels,
  teamViewContainer,
  midDiv,
  positionDivs,
  classNames
);

drawTeamCreator(document.body, teamViewContainer, inputFields);
makeTeamObs(
  inputFields,
  positionDivs,
  playerDetails,
  playerNameLabels,
  playerStatsLabels
);

const resultsDiv = document.createElement("div");
resultsDiv.classList.add("resultsDiv");
document.body.appendChild(resultsDiv);
