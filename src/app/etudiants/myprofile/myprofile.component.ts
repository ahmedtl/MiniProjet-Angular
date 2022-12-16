import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/core/Model/Account';
import { Etudiant } from 'src/app/core/Model/Etudiant';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  public currentUser:Account;
  etudiant: Etudiant;
  public PForm:FormGroup;
  etudiantList: Etudiant[];

  constructor(
    private userService: UserService,
    private router: Router,
    private fb:FormBuilder
    ) { }

  ngOnInit(): void {
    //console.log(this.currentUser.userLastName);
    //location.reload()
    this.etudiant = new Etudiant();
    this.currentUser = JSON.parse(localStorage.getItem('user') as any);
    this.currentUser.userName
    //this.nom=this.currentUser.userLastName;
    this.PForm=this.fb.group(
      {
        nomE: [this.currentUser.userLastName,[Validators.required,Validators.minLength(3)]],
        prenomE: [this.currentUser.userFirstName,[Validators.required,Validators.minLength(3)]],
        options: ['',[Validators.required]],
        UserName: [this.currentUser.userName,[Validators.required]]
      }
    )
  }
  add() {
    this.userService.assigntoaccount(this.PForm.value).subscribe((result) => {
      if (result) {
        console.log('this.etudiant:', this.etudiant);
        alert("Ajout avec succes!")
        this.PForm.reset()
        //this.router.navigate(['/home'])
        //this.etudiantList = [this.etudiant, ...this.etudiantList];
        //location.reload();
      }
    });
  }
}
