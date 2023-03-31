import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _score = new BehaviorSubject<number>(0);
  public score$ = this._score.asObservable();

  constructor() {}

  updateScore(newScore: number): void {
    this._score.next(newScore);
  }
}
