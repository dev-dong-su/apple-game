import { Component } from '@angular/core';
import { UserService } from '@app/share/service/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './main.component.html',
})
export class MainComponent {
  userName: string = '사과';

  constructor(private userService: UserService) {}

  userNameLength(): number {
    return (this.userName || '').length;
  }
}
