import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Account } from 'src/app/core/Model/Account';
import { Etudiant } from 'src/app/core/Model/Etudiant';
import { EtudiantService } from 'src/app/core/services/etudiant.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list-etudiant',
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css']
})
export class ListEtudiantComponent implements OnInit {
  searchText:string='';
  parentData =""
  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15];
  order: boolean = true;
  searchForm: FormGroup;

  account:Account;
  accountList:Account[];
  etudiant: Etudiant;
  etudiantList: Etudiant[];

  constructor(private etudiantService: EtudiantService, private userService: UserService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.account=new Account();
    this.etudiant = new Etudiant();
    //getEtudiants
    /*this.etudiantService.getAllEtudiant().subscribe((data: Etudiant[]) => {
      this.etudiantList = data;
    });*/
    //getAccounts
    this.userService.getAllAccount().subscribe((data: Account[]) => {
      this.accountList = data;
      
    });

    this.searchForm = this.fb.group({
      search: new FormControl(),
    });

  }

  delete(id: number) {
    this.etudiantService.deleteEtudiant(id).subscribe((data) => {
      console.log(data);
      this.etudiantService.getAllEtudiant();
      location.reload();
    
  })
}

deleteAccount(userName: string) {
  this.userService.deletaccount(userName).subscribe((data) => {
    console.log(data);
    this.userService.getAllAccount();
    location.reload();
  
})
}

transferData(){
  this.parentData=this.searchText
}

postList(): void {
  this.userService.getAllAccount().subscribe((data: Account[]) => {
    this.accountList = data;
  });
}

onTableDataChange(event: any): void {
  this.page = event;
  this.postList();
}

onTableSizeChange(event: any) {
  this.tableSize = event.target.value;
  this.page = 1;
  this.postList();
}


  onSearchTextEntered(searchValue:string){
    this.searchText=searchValue
    console.log(this.searchText)
  }
}
