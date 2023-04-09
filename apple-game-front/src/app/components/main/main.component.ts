import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '@app/share/service/theme.service';
import { UserService } from '@app/share/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  username: string = '사과';
  theme: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.theme = this.themeService.getTheme();
    console.log(this.theme);
  }

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
