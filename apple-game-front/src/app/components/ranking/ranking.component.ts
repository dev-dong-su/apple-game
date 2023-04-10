import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/share/models/user.model';
import { ThemeService } from '@app/share/service/theme.service';
import { UserService } from '@app/share/service/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
})
export class RankingComponent implements OnInit {
  users: User[] = [];
  theme: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  linkToGmaePage(): void {
    this.router.navigate(['game']);
  }

  ngOnInit(): void {
    this.theme = this.themeService.getTheme();
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }
}
