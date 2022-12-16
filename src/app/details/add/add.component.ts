import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Detail } from 'src/app/core/Model/Detail';
import { DetailService } from 'src/app/core/services/team-detail.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  detailForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    detail: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(private detailService: DetailService, private router: Router, private fb: FormBuilder) { }

  add() {
    let detail = {
        name: this.detailForm.get('name')?.value,
        detail: this.detailForm.get('detail')?.value
    }
    this.detailService.addDetail(detail).subscribe(() => {
      this.router.navigate(['/teams/details']);
    }) 
  }
}
