import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSignInComponent } from './page-sign-in.component';

const routes: Routes = [{ path: '', component: PageSignInComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageSignInRoutingModule { }
