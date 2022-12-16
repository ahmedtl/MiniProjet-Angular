import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Detail } from 'src/app/core/Model/Detail';
import { DetailService } from 'src/app/core/services/team-detail.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  details!: Detail[];
  search: String = '';

  constructor(private detailService: DetailService, private router: Router,public userService: UserService) { }

  ngOnInit(): void {
    this.detailService.getAll().subscribe(details => {
      this.details = details;
    })
  }

  public get filteredDetails() : Detail[] {
    if (this.search.trim() != '') {
      let s = this.search.trim().toUpperCase();
      return this.details.filter(d => d.name.toUpperCase().includes(s) || d.detail.toUpperCase().includes(s));
    }
    return this.details;
  }

  goToAdd() {
    this.router.navigate(['teams/details/add']);
  }

  goToDelete(id: any) {
    this.router.navigate(['teams/details/delete', id]);
  }

  goToUpdate(id: any) {
    this.router.navigate(['teams/details/update', id]);
  }

  goToShowDetail(id: any) {
    this.router.navigate(['teams/details/show', id]);
  }
  
}
