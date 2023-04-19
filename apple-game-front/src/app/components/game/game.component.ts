import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '@app/share/service/game.service';
import { LocalStorageService } from '@app/share/service/local-storage.service';
import { ThemeService } from '@app/share/service/theme.service';
import { UserService } from '@app/share/service/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { AppleGameComponent } from './apple-game/apple-game.component';

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
  isMobile: boolean = false;

  @ViewChild(AppleGameComponent) appleGameComponent!: AppleGameComponent;

  constructor(
    private localStorage: LocalStorageService,
    private gameService: GameService,
    private themeService: ThemeService,
    private userService: UserService,
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
        if (this.finalScore > this.bestScore) {
          this.bestScore = this.finalScore;
        }
      }
    }, 1000);
  }

  ngOnInit(): void {
    let user = this.localStorage.getLocalStorageItem('user');
    this.userService.addUser(user.username).subscribe(() => {
      user = this.localStorage.getLocalStorageItem('user');

      this.username = user.username;
      if (user.best_score) {
        this.bestScore = user.best_score;
      }
    });
    this.theme = this.themeService.getTheme();
    this.isMobile = this.themeService.isMobileDevice();
  }

  onRefreshButtonClick(): void {
    this.gameService.updateStartTime();
    this.timeRemaining = 120;
    this.appleGameComponent.refreshCanvas();
    this.gameService.updateScore(0);
  }

  changeTheme(): void {
    const theme = this.localStorage.getLocalStorageItem('theme');
    if (theme == 0) {
      this.localStorage.setLocalStorageItem('theme', 1);
    } else {
      this.localStorage.setLocalStorageItem('theme', 0);
    }
    window.location.reload();
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
