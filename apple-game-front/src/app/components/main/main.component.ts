import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/share/service/local-storage.service';
import { ThemeService } from '@app/share/service/theme.service';
import { UserService } from '@app/share/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  username: string = '사과';
  theme: any;
  isMobile: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private themeService: ThemeService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const token = this.localStorageService.getLocalStorageItem('access_token');
    if (token) {
      this.userService.checkUserToken().subscribe((good) => {
        if (good) this.router.navigate(['game']);
      });
    }
    this.theme = this.themeService.getTheme();
    this.isMobile = this.themeService.isMobileDevice();
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
