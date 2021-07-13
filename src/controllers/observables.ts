import {
  debounceTime,
  filter,
  from,
  fromEvent,
  map,
  Observable,
  of,
  switchMap,
} from "rxjs";
import { environments } from "../environments";
import { Player } from "../models/player";

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
