import { Player } from "./player";

export class Team {
  players: Player[];
  name: string;

  constructor(players: Player[]) {
    this.players = players;
    this.name = "My club";
  }

  getCoefficient(): number {
    let coef: number = 0;
    this.players.forEach((p) => {
      coef += p.pace + p.passing + p.shooting + p.defending;
    });

    return coef / this.players.length;
  }
}
