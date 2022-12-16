import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  { path: '', component: ListComponent},
  { path: 'add', component: AddComponent},
  { path: 'update/:id', component: UpdateComponent},
  { path: 'delete/:id', component: DeleteComponent},
  { path: 'show/:id', component: ShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
