import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./about.component";
import {EditComponent} from "./edit.component";

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'edit',
    component: EditComponent
  },
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
