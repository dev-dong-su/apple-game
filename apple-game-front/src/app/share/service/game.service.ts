import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from '@app/environment/environment';
import { Observable, catchError, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _score = new BehaviorSubject<number>(0);
  public score$ = this._score.asObservable();
  public gameOver: boolean = false;
  private baseURL = environment.BASE_URL;
  private gameSeesionId: number = 0;

  constructor(
    private http: HttpClient,
    private error: HandleErrorService,
    private localStorageService: LocalStorageService
  ) {}

  getHttpOptions() {
    const token = this.localStorageService.getLocalStorageItem('access_token');
    if (token) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      };
    } else {
      return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
    }
  }

  updateScore(newScore: number): void {
    this._score.next(newScore);
  }

  startGame(username: string): Observable<any> {
    return this.http
      .post<any>(
        `${this.baseURL}/game/start/`,
        { username: username },
        this.getHttpOptions()
      )
      .pipe(
        tap((response: any) => {
          this.gameSeesionId = response.session_id;
        }),
        catchError(this.error.handleError<any>('startGame'))
      );
  }

  endGame(new_score: number): Observable<any> {
    this.gameOver = true;
    return this.http
      .post<any>(
        `${this.baseURL}/game/end/`,
        { session_id: this.gameSeesionId, new_score: new_score },
        this.getHttpOptions()
      )
      .pipe(
        tap((response: any) => {}),
        catchError(this.error.handleError<any>('endGame'))
      );
  }

  getScore(): number {
    return this._score.getValue();
  }
}
