import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/share/models/user.model';
import { UserService } from '@app/share/service/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
})
export class RankingComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  linkToGmaePage(): void {
    this.router.navigate(['game']);
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }
}
