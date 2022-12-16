import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Detail } from 'src/app/core/Model/Detail';
import { DetailService } from 'src/app/core/services/team-detail.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  detailId!: number;
  detail!: Detail;
  detailForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    detail: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(
    private detailService: DetailService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    let id = this.currentRoute.snapshot.params['id'];
    if (!id) {
      this.router.navigate(['/details'])
    } else {
      this.detailId = id;
    }

    this.detailService.getDetailById(id).subscribe((detail: any) => {
      this.detail = detail[0];
      this.detailId = detail[0].id;

        this.detailForm.setValue({
            name: this.detail.name,
            detail: this.detail.detail
        });
    });
  }

  update() {
    let detail = {
        id: this.detailId,
        name: this.detailForm.get('name')?.value,
        detail: this.detailForm.get('detail')?.value
    }
    this.detailService.updateDetail(detail).subscribe(() => {
      this.router.navigate(['/teams/details']);
    }) 
  }

}
