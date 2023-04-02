import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _score = new BehaviorSubject<number>(0);
  public score$ = this._score.asObservable();
  public gameOver: boolean = false;

  constructor() {}

  updateScore(newScore: number): void {
    this._score.next(newScore);
  }

  getScore(): number {
    return this._score.getValue();
  }

  endGame() {
    this.gameOver = true;
  }
}
