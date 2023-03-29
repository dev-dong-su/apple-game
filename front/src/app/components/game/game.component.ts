import { Component } from '@angular/core';
import { UserService } from '@app/share/service/user.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
})
export class GameComponent {
  constructor(private userService: UserService) {}
}
