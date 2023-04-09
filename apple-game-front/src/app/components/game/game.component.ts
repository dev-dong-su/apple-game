import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/share/models/user.model';
import { GameService } from '@app/share/service/game.service';
import { LocalStorageService } from '@app/share/service/local-storage.service';
import { ThemeService } from '@app/share/service/theme.service';
import { UserService } from '@app/share/service/user.service';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {
  id: number = 0;
  username: string = '';
  gameStarted: boolean = false;
  score$: Observable<number>;
  timeRemaining: number = 120;
  countdownTimer: any;
  finalScore: number | null = null;
  bestScore: number = 0;
  theme: any;

  constructor(
    private localStorage: LocalStorageService,
    private gameService: GameService,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.score$ = gameService.score$;
  }

  startGame(): void {
    this.gameStarted = true;
    this.gameService.startGame(this.username).subscribe(() => {
      this.startCountdown();
    });
  }

  startCountdown(): void {
    this.countdownTimer = setInterval(() => {
      this.timeRemaining -= 1;
      if (this.timeRemaining <= 0) {
        clearInterval(this.countdownTimer);
        this.gameStarted = false;
        this.finalScore = this.gameService.getScore();
        this.timeRemaining = 120;
        this.gameService.endGame(this.finalScore).subscribe();
      }
    }, 1000);
  }

  ngOnInit(): void {
    const user = this.localStorage.getLocalStorageItem('user');
    this.theme = this.themeService.getTheme();
    this.username = user.username;
    if (user.best_score) {
      this.bestScore = user.best_score;
    }
  }

  linkToRangkingPage(): void {
    this.router.navigate(['ranking']);
  }

  linkToMemuPage(): void {
    this.router.navigate(['menu']);
  }

  ngOnDestroy() {
    clearInterval(this.countdownTimer);
  }
}
