import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { ShowComponent } from './show/show.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetailsComponent,
    ListComponent,
    UpdateComponent,
    AddComponent,
    DeleteComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DetailsModule { }
