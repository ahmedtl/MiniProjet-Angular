import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/app/core/Model/Department';
import { Observable } from "rxjs";
import { DepartmentService } from 'src/app/core/services/department.service';
import { Etudiant } from 'src/app/core/Model/Etudiant';
import { UserService } from 'src/app/core/services/user.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {
  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 1;
  tableSizes: any = [1, 2, 15, 20];

  @ViewChild('content', { static: false }) el!: ElementRef;
  list: Departement[];
 
  nomUniversite:any;
  idDepartement:number;
  departmentsList:any;
  codeDepartment:any;
  idUniversite:number;
  departments:Departement=new Departement();
  listDepartment:Departement[]=[]
  listetudiants: Etudiant[];
  constructor(private departmentservice:DepartmentService,private router: Router,private uss: ActivatedRoute,
    public userService: UserService) { }

 /* listData: MatTableDataSource<any>;*/
  ngOnInit(): void {
   this.getAlldep();
 
  }
  getEtudiantdep(){
    this.router.navigate(['/departments/Department/show',this.idDepartement]);
   
  }
 
  getAlldep() {
    this.departmentservice.getAlldep().subscribe(
      response => { this.listDepartment = response; console.log(response) })

  }
  updatedepartment(idDepartement: number) {
    this.router.navigate(['/departments/Department/update', idDepartement]);
  }

  
  deletedepartment(idDepartement: number) {
    this.departmentservice. deleteDepartment(idDepartement).subscribe((data) => {
      console.log(data);
      this.getAlldep();
    });
  }
  
  toadd(){
    this.router.navigate(['/departments/Department/add'])
  } 
      
  exportToPDF() {
    this.departmentservice.exportPDF().subscribe((responseMessage: any) => {
      const file = new Blob([responseMessage], {
        type: 'application/pdf',
      });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

   onTableDataChange(event: any): void {
    this.page = event
    this.postList();
  }
  
  onTableSizeChange(event: any){
    this.tableSize = event.target.value;
    this.page = 1;
    this.postList();
  }
  postList(): void {
    this.departmentservice.getAlldep().subscribe((data: Departement[]) => {
      this.departmentsList = data;
    });
  }

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a3');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('Departements.pdf');
      },
    });
  }

}

