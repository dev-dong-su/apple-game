import { Component, OnInit } from '@angular/core';
import { User } from '@app/share/models/user.model';
import { GameService } from '@app/share/service/game.service';
import { LocalStorageService } from '@app/share/service/local-storage.service';
import { UserService } from '@app/share/service/user.service';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {
  id: number = 0;
  name: string = '';
  gameStarted: boolean = false;
  score$: Observable<number>;
  timeRemaining: number = 120;
  countdownTimer: any;
  finalScore: number | null = null;

  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService,
    private gameService: GameService
  ) {
    this.score$ = gameService.score$;
  }

  startGame(): void {
    this.gameStarted = true;
    this.startCountdown();
  }

  startCountdown(): void {
    this.countdownTimer = setInterval(() => {
      this.timeRemaining -= 1;
      if (this.timeRemaining <= 0) {
        clearInterval(this.countdownTimer);
        this.gameStarted = false;
        this.finalScore = this.gameService.getScore();
      }
    }, 1000);
  }

  ngOnInit(): void {
    const user = this.localStorage.getLocalStorageItem('user');
    this.id = user.id;
    this.name = user.name;
  }
}
