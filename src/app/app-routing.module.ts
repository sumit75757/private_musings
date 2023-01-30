import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { AuthComponent } from './auth/auth.component';
import { ListComponent } from './page/list/list.component';
import { AddListComponent } from './page/add-list/add-list.component';
const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: "list",
        component: ListComponent
      },
      {
        path: "add",
        component: AddListComponent
      },
      {
        path: "add/:id",
        component: AddListComponent
      }
    ]
  },
  {
    path: "auth",
    component: AuthComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
