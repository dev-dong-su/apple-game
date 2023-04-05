import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/share/service/local-storage.service';
import { UserService } from '@app/share/service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  username: string = '';
  new_name: string = '';
  best_score: number = 0;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user = this.localStorageService.getLocalStorageItem('user');
    this.username = user.username;
    this.best_score = user.best_score;
  }

  linkToGmaePage(): void {
    this.router.navigate(['game']);
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
