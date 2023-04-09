import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/share/service/local-storage.service';
import { ThemeService } from '@app/share/service/theme.service';
import { UserService } from '@app/share/service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  username: string = '';
  new_name: string = '';
  best_score: number = 0;
  theme: object = {};

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    const user = this.localStorageService.getLocalStorageItem('user');
    this.username = user.username;
    this.best_score = user.best_score;
    this.theme = this.themeService.getTheme();
  }

  linkToGmaePage(): void {
    this.router.navigate(['game']);
  }

  userOut(): void {
    this.localStorageService.deleteLocalStorageItem('user');
    this.localStorageService.deleteLocalStorageItem('access_token');
    this.router.navigate(['home']);
  }

  changeUserName(): void {
    this.userService
      .updateUser(
        {
          username: this.username,
          best_score: this.best_score,
        },
        this.new_name
      )
      .subscribe(() => {
        const user = this.localStorageService.getLocalStorageItem('user');
        this.username = user.username;

        alert('변경 완료!');
      });
  }
}
