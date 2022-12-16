import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Detail } from 'src/app/core/Model/Detail';
import { Team } from 'src/app/core/Model/Team';
import { DetailService } from 'src/app/core/services/team-detail.service';
import { TeamService } from 'src/app/core/services/team.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  teamForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    desc: ['', [Validators.required, Validators.minLength(10)]],
    detail: ['']
  });

  details!: Detail[];

  constructor(private teamService: TeamService, private detailService: DetailService,private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.detailService.getAll().subscribe(details => {
      this.details = details;
    })
  }

  onSubmit() {
  }

  add() {
    let team = {
        name: this.teamForm.get('name')?.value,
        description: this.teamForm.get('desc')?.value,
        detail_id: this.teamForm.get('detail')?.value || null
    }
    this.teamService.addTeam(team).subscribe(() => {
      this.router.navigate(['/teams']);
    }) 
  }
}
