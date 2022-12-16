import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Detail } from 'src/app/core/Model/Detail';
import { Team } from 'src/app/core/Model/Team';
import { DetailService } from 'src/app/core/services/team-detail.service';
import { TeamService } from 'src/app/core/services/team.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  teamId!: number;
  team!: Team;
  teamForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    desc: ['', [Validators.required, Validators.minLength(10)]],
    detail: ['']
  });

  details!: Detail[];

  constructor(
    private teamService: TeamService,
    private detailService: DetailService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    let id = this.currentRoute.snapshot.params['id'];
    if (!id) {
      this.router.navigate(['/teams'])
    } else {
      this.teamId = id;
    }

    this.teamService.getTeamById(id).subscribe((team: any) => {
      this.team = team[0];
      this.teamId = team[0].id;     
      

        this.teamForm.setValue({
            name: this.team.name,
            desc: this.team.description,
            detail: null
        }); 
    });

    this.detailService.getAll().subscribe(details => {
        this.details = details;
    });

  }

  update() {
    let team = {
        id: this.teamId,
        name: this.teamForm.get('name')?.value,
        description: this.teamForm.get('desc')?.value,
        detail_id: this.teamForm.get('detail')?.value || null
    }
    this.teamService.updateTeam(team).subscribe(() => {
      this.router.navigate(['/teams']);
    })
    
  }

}
