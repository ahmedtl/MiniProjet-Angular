import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tache } from 'src/app/core/Model/Tache';
import { TacheService } from 'src/app/core/services/tache.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list-tache',
  templateUrl: './list-tache.component.html',
  styleUrls: ['./list-tache.component.css']
})
export class ListTacheComponent implements OnInit {
  Taches:any;
  allTaches:number=0;
  pagination:number=1;
  constructor(private tacheservice :TacheService,
    private route:Router ,private toastr: ToastrService,public userService: UserService ) { }
    tache: Tache;
    search: string;
  searchText :string;
    tacheList: Tache[];
    ngOnInit(): void {
       this.fetchTache();
    console.log(this.fetchTache());
      this.allTache();
      this.tache = new Tache();  
  }
  setSearch(event:any){
    console.log("value",event.target.value);
    this.search =event.target.value;
  }
  FindbyNom(){
    
    this.tacheservice.findByNom(this.search).subscribe((res) => {
      console.log("list from res :",res);
      if (res.length!=0){
        this.tacheList = res;
      }
      else{
        this.tacheList = [];
      }
      
    });

  }
  allTache() {
    this.tacheservice.getAllT().subscribe((res) => {
      this.tacheList = res;
    });
}
add() {
  this.tacheservice.create
    (this.tache)
    .subscribe(
      () => (this.tacheList = [this.tache, ...this.tacheList])
    );
}
deleteTache(idTache: any) {
  this.tacheservice.delete(idTache).subscribe((data) => {
    console.log(data);
    this.allTache();
  });
  this.toastr.error("Tache Supprimer!");  

}
//updateContract
postList(): void {
  this.tacheservice.getAllT().subscribe((data: Tache[]) => {
    this.tacheList = data;
  });
}
updateTache(idProjet: any) {
  this.route.navigate(['/gestiontache/tache/putTache/', idProjet]);
}
fetchTache() {
  this.tacheservice.getTache(this.pagination).subscribe((res: any) => { 
  this.Taches=res.data;
  this.allTaches=res.total;
  console.log(res.total);
  });
}
renderPage(event:number){
  this.pagination=event;
  this.fetchTache();
}
triASC(){
  this.tacheservice.TrierASD().subscribe((res)=> {
    this.tacheList =res;
  });
}
triDESC(){
  this.tacheservice.TrierDESC().subscribe((res)=> {
    this.tacheList =res;
  });
}

}
