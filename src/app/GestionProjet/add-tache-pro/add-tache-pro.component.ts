import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tache } from 'src/app/core/Model/Tache';
import { TacheService } from 'src/app/core/services/tache.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-tache-pro',
  templateUrl: './add-tache-pro.component.html',
  styleUrls: ['./add-tache-pro.component.css']
})
export class AddTacheProComponent implements OnInit {
  MyForm:FormGroup;
  @Output() notif= new EventEmitter<any>();
  libelle: any;
  prixTache: any;
  
  constructor(private router:Router,private serviceTache:TacheService,public activeModal1: NgbActiveModal,private toastr: ToastrService) { }
  tache : Tache=new Tache();  
  submitted = false; 
  ngOnInit(): void {
    this.submitted=false;
  }
  Tachesaveform=new FormGroup({  
     
    libelle:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]{4,}?")]),  
    prixTache:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9]{4,}?")])  
  });  
  saveTache(){  
    this.tache=new Tache();     
    this.tache.libelle=this.libelle;  
    this.tache.prixTache=this.prixTache
    console.log(this.tache);
    this.submitted = true;  
    this.save();  
  } 
  save() {  
    this.serviceTache.create(this.tache)  
      .subscribe((data) => {console.log(data)});
    this.tache = new Tache();
    this.toastr.success("Ajouter avec success!");  
  }  
  get Tachelibelle(){  
    return this.Tachesaveform.get('libelleRayon');  
  }  
  
  get TachePrix(){  
    return this.Tachesaveform.get('codeRayon');  
  }
  addRayonForm(){  
    this.submitted=false;  
    this.Tachesaveform.reset();  
  }  
   
}
