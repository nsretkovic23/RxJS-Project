import {
  combineLatest,
  debounceTime,
  filter,
  from,
  fromEvent,
  map,
  Observable,
  of,
  switchMap,
  toArray,
} from "rxjs";
import { environments } from "../environments";
import { Competition } from "../models/competition";
import { Opponent } from "../models/opponent";
import { Player } from "../models/player";
import { Team } from "../models/team";
import { drawPlayer } from "../view/drawingFunctions";

export function playerInputObs(
  inputField: HTMLInputElement,
  playerContainer: HTMLDivElement,
  playerPosition: string
) {
  return fromEvent(inputField, "input").pipe(
    debounceTime(500),
    map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
    filter((playerName) => playerName.length >= 3),
    switchMap((playerName) =>
      getPlayer(playerName, playerContainer, playerPosition)
    ),
    map((data) => data[0])
  );
}

function getPlayer(
  playerName: string,
  playerContainer: HTMLDivElement,
  playerPosition: string
): Observable<Player[]> {
  return from(
    fetch(`${environments.API_URL}/${playerPosition}/?name=${playerName}`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Player not found");
      })
      .catch((err) => (playerContainer.innerHTML = "Player not found"))
  );
}

export function makeTeamObs(
  inputFields: HTMLInputElement[],
  positionDivs: HTMLDivElement[],
  playerDetails: HTMLDivElement[],
  playerNameLabels: HTMLLabelElement[],
  playerStatsLabels: HTMLLabelElement[]
) {
  const goalkeeperObs = playerInputObs(
    inputFields[0],
    positionDivs[0],
    "goalkeepers"
  );
  goalkeeperObs.subscribe((player: Player) =>
    drawPlayer(
      positionDivs[0],
      player,
      playerDetails[0],
      playerNameLabels[0],
      playerStatsLabels[0]
    )
  );

  const defenderObs = playerInputObs(
    inputFields[1],
    positionDivs[1],
    "defenders"
  );
  defenderObs.subscribe((player: Player) =>
    drawPlayer(
      positionDivs[1],
      player,
      playerDetails[1],
      playerNameLabels[1],
      playerStatsLabels[1]
    )
  );

  const leftMidfielderObs = playerInputObs(
    inputFields[2],
    positionDivs[2],
    "leftmids"
  );
  leftMidfielderObs.subscribe((player: Player) =>
    drawPlayer(
      positionDivs[2],
      player,
      playerDetails[2],
      playerNameLabels[2],
      playerStatsLabels[2]
    )
  );

  const rightMidfielderObs = playerInputObs(
    inputFields[3],
    positionDivs[3],
    "rightmids"
  );
  rightMidfielderObs.subscribe((player: Player) =>
    drawPlayer(
      positionDivs[3],
      player,
      playerDetails[3],
      playerNameLabels[3],
      playerStatsLabels[3]
    )
  );

  const attackersObs = playerInputObs(
    inputFields[4],
    positionDivs[4],
    "attackers"
  );
  attackersObs.subscribe((player: Player) =>
    drawPlayer(
      positionDivs[4],
      player,
      playerDetails[4],
      playerNameLabels[4],
      playerStatsLabels[4]
    )
  );

  combineLatest([
    goalkeeperObs,
    defenderObs,
    leftMidfielderObs,
    rightMidfielderObs,
    attackersObs,
  ]).subscribe(([gk, def, lmf, rmf, att]) => {
    if (gk && def && lmf && rmf && att) {
      let team = new Team([gk, def, lmf, rmf, att]);
      let competition = new Competition(getOpponents(), team);
      competition.startCompetition();
    } else {
      console.log("wrong input");
    }
  });
}

export function getOpponents(): Observable<Opponent[]> {
  return from(
    fetch(`${environments.API_URL}/teams`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Team not found");
      })
      .catch((err) => console.log("error"))
  );
}
