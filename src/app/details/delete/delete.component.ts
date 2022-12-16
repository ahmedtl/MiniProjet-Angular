import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Detail } from 'src/app/core/Model/Detail';
import { DetailService } from 'src/app/core/services/team-detail.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: []
})
export class DeleteComponent implements OnInit {
  detailId!: number;
  detail!: Detail;
  constructor(private detailService: DetailService, private currentRoute: ActivatedRoute, private router: Router) { }

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
    });
  }

  delete() {
    this.detailService.deleteDetail(this.detailId).subscribe(() => {
      this.router.navigate(['/teams/details']);
    })
  }

}
