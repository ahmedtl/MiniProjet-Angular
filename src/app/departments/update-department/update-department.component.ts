import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/app/core/Model/Department';
import { Universite } from 'src/app/core/Model/Universite';
import { DepartmentService } from 'src/app/core/services/department.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {
  listuniversites:any
  idDepartement: number;
  idUniversite:Universite;
  departementList:Departement[]

  parameter: number;
  departement: Departement;
  constructor(
    private departementservice: DepartmentService,
    private route: ActivatedRoute,
 
    private currentRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.departement = new Departement();
    let id = this.currentRoute.snapshot.params['id'];
    if (id != null) {
      //update
     
      this.departementservice.getDepartmentById(id).subscribe((data: Departement) => {
       
        this.departement = data;
      });
      console.log('=================>' + this.departement);
     
    } else {
      //add
      this.departement = new Departement();
    }

    //get
    this.departementservice.getAlldep().subscribe((data: Departement[]) => {
      this.departementList = data;
    });
  }
  updateDep() {
    this.departementservice
    .updateDepartment(this.departement)
    .subscribe(() => console.log('complete'));
  this.router.navigate(['/departments/Department/list']);
}
}
