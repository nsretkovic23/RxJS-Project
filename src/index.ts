import { drawTeamCreator } from "./view/drawingFunctions";

const gkInput = document.createElement("input");
const defInput = document.createElement("input");
const leftMidInput = document.createElement("input");
const rightMidInput = document.createElement("input");
const attInput = document.createElement("input");

drawTeamCreator(document.body, [gkInput, defInput, leftMidInput, rightMidInput, attInput])
