import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/core/Model/Account';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  updateForm:FormGroup;
  public account:Account;
  public currentUser:Account;
  //userName:string;
  userFirstName:string;
  userLastName:string;
  constructor(private router: Router,private userService: UserService,) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') as any);
    this.updateForm = new FormGroup({
      userName: new FormControl(this.currentUser.userName),
      userFirstName: new FormControl(this.currentUser.userFirstName),
      userLastName: new FormControl(this.currentUser.userLastName)
    });
    
  }

  update(form: FormGroup) {
    
    console.log('this.user:', this.currentUser);
    this.currentUser.userFirstName=this.updateForm.value.userFirstName;
    this.currentUser.userLastName=this.updateForm.value.userLastName;
    localStorage.setItem('user', JSON.stringify(this.currentUser));
    console.log('this.user:', this.currentUser);
   
 

   
    this.userService.updateAcount(this.currentUser).subscribe((result) => {
      if (result) {
        console.log('this.user:', this.account);
        //this.router.navigate(['/home'])
        //this.etudiantList = [this.etudiant, ...this.etudiantList];
        location.reload();
      }
    });
  }

}
