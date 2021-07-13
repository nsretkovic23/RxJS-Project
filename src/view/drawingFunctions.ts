import { Player } from "../models/player";

export function drawTeamCreator(host: HTMLElement, teamViewContainer:HTMLDivElement, inputs: HTMLInputElement[]) {
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

export function drawPlayer(host:HTMLDivElement, player:Player, playerDetailsDiv:HTMLDivElement, playerNameLbl:HTMLLabelElement, playerStatsLbl:HTMLLabelElement){
    
    host.appendChild(playerDetailsDiv);
    playerDetailsDiv.appendChild(playerNameLbl);
    playerDetailsDiv.appendChild(playerStatsLbl);
    if(player)
    {
        playerDetailsDiv.style.backgroundColor="gold";
    
        playerNameLbl.innerHTML = player.name;
    
        playerStatsLbl.innerHTML = `Pace: ${player.pace} Defending: ${player.defending} Shooting: ${player.shooting} Passing: ${player.passing}`;
    }
    else{
        host.appendChild(playerDetailsDiv);
        playerDetailsDiv.appendChild(playerNameLbl);
        playerNameLbl.innerHTML="Player not found"
        playerDetailsDiv.style.backgroundColor = "red";
        playerStatsLbl.innerHTML="";
    }
    
}