import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/share/service/local-storage.service';
import { UserService } from '@app/share/service/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './main.component.html',
})
export class MainComponent {
  userName: string = '사과';

  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  userNameLength(): number {
    return (this.userName || '').length;
  }

  linkToGmaePage(): void {
    const name = this.userName;
    this.userService.addUser(name).subscribe((user) => {
      this.localStorage.setLocalStorageItem('user', user);
      this.router.navigate(['game']);
    });
  }
}
