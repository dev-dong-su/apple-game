import { Component, OnInit } from '@angular/core';
import { User } from '@app/share/models/user.model';
import { LocalStorageService } from '@app/share/service/local-storage.service';
import { UserService } from '@app/share/service/user.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {
  id: number = 0;
  name: string = '';

  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    const user = this.localStorage.getLocalStorageItem('user');
    this.id = user.id;
    this.name = user.name;
  }
}
