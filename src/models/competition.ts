import { concatMap, delay, from, Observable, of } from "rxjs";
import { drawResults } from "../view/drawingFunctions";
import { Opponent } from "./opponent";
import { Team } from "./team";

export class Competition {
  myTeam: Team;

  opponents: Opponent[] = [];
  opponentsObs: Observable<Opponent[]>;

  constructor(opponentsObs: Observable<Opponent[]>, myTeam: Team) {
    this.myTeam = myTeam;
    this.opponentsObs = opponentsObs;
  }

  playGames(opponents: Opponent[]) {
    from(opponents)
      .pipe(concatMap((opp) => of(opp).pipe(delay(1000))))
      .subscribe((data) =>
        this.determineWinner(this.myTeam.getCoefficient(), data)
      );
  }

  startCompetition() {
    this.opponentsObs.subscribe((opps) => {
      this.playGames(opps);
    });
  }

  determineWinner(myTeamCoeff: number, opponent: Opponent) {
    let myScore, opponentScore;

    if (myTeamCoeff >= opponent.coefficient) {
      myScore = Math.round(Math.random() * 5);
      opponentScore = Math.round(Math.random() * 4);
    } else {
      myScore = Math.round(Math.random() * 4);
      opponentScore = Math.round(Math.random() * 5);
    }
    let outcome: string;

    if (myScore > opponentScore) outcome = "win";
    else if (myScore < opponentScore) outcome = "lost";
    else outcome = "draw";

    drawResults(opponent.name, myScore, opponentScore, outcome);
  }
}
