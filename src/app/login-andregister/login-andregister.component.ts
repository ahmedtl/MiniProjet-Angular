import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../core/services/user-auth.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-login-andregister',
  templateUrl: './login-andregister.component.html',
  styleUrls: ['./login-andregister.component.css']
})
export class LoginANDregisterComponent implements OnInit {
  public error = '';
  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router) {}

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      // response c'est la response du spring
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setuser(response.user);
        // redirection 
        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/contracts/ContractsList']);
          
        } else {
          this.router.navigate(['/etudiants/myProfile']);
          
        }
      },
      (error) => {
        this.error=error;
        console.log(error);
      }
    );
  }

  register(registerForm: NgForm) {
    this.userService.register(registerForm.value).subscribe(
      // response c'est la response du spring
      (response: any) => {
        //this.userRegisterService.setRoles(response.role.roleName);
        //this.userRegisterService.setToken(response.jwtToken);

        //this.userRegisterService.setuser_first_name(response.user.user_first_name);
        //this.userRegisterService.setuser_last_name(response.user.user_last_name);
        // redirection 
        //const role = response.user.role[0].roleName;
        //if (role === 'Admin') {
        //  this.router.navigate(['/admin']);
        //} else {
          //this.router.navigate(['/login']);
          alert("Ajout avec succes!")
          registerForm.reset()
        //}
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
