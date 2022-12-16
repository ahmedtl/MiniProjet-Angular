import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { DetailsDepartmentComponent } from './details-department/details-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { SearchComponent } from './search/search.component';




@NgModule({
  declarations: [
    DepartmentsComponent,
    CreateDepartmentComponent,
    DetailsDepartmentComponent,
    ListDepartmentComponent,
    UpdateDepartmentComponent,
SearchComponent
    
  ],
  imports: [CommonModule, DepartmentsRoutingModule, FormsModule, NgxPaginationModule, ReactiveFormsModule],
})
export class DepartmentsModule { }
