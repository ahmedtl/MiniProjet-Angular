import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { Tache } from 'src/app/core/Model/Tache';
import { TacheService } from 'src/app/core/services/tache.service';

@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.css'],
  providers: [DatePipe],
})
export class AddTacheComponent implements OnInit {

  constructor(private datePipe: DatePipe,
    private tacheservice : TacheService, private route: Router,
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService) { }
    tache:Tache;
    tacheList:Tache[];
    action: string;
  currentDate = new Date();
  mindate: any;

  ngOnInit(): void {this.mindate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
  this.tache = new Tache();
  
  let id = this.currentRoute.snapshot.params['id'];
  this.tache.idTache = id;
  if (id != null) {
    //update
    this.action = 'update';
    this.tacheservice.get(id).subscribe((data: Tache) => {
      this.tache = data;
    });
    console.log('=================>' + this.tache);
    } else {
      //add
      this.action = 'add new';
      this.tache = new Tache();
    }
    this.tacheservice.getAllT().subscribe((data: Tache[]) => {
      this.tacheList = data;
    });
  }
  saveTache():void{
    let data=new Tache()
    data ={
      idTache : this.tache.idTache,
      libelle:this.tache.libelle,
      prixTache:this.tache.prixTache
    };
    console.log(data);
    this.tacheservice.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.route.navigate(['/gestiontache/ListTacheComponent']);          
        },
        error: (e) => console.error(e)
      });
      this.toastr.success("success");
  }
  delete() {
    this.tacheservice.delete(this.tache.idTache);
  }

  }
  

