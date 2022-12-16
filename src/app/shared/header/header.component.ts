import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/core/Model/Account';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currentUser:Account;
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') as any);
    
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

}
