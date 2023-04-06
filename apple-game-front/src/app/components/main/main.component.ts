import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/share/service/local-storage.service';
import { UserService } from '@app/share/service/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './main.component.html',
})
export class MainComponent {
  username: string = '사과';

  constructor(private userService: UserService, private router: Router) {}

  userNameLength(): number {
    return (this.username || '').length;
  }

  linkToGmaePage(): void {
    const name = this.username;
    this.userService.addUser(name).subscribe(() => {
      this.router.navigate(['game']);
    });
  }
}
