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
  score$: Observable<number>;

  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService,
    private gameService: GameService
  ) {
    this.score$ = gameService.score$;
  }

  ngOnInit(): void {
    const user = this.localStorage.getLocalStorageItem('user');
    this.id = user.id;
    this.name = user.name;
  }
}
