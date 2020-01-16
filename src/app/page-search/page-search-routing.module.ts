import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSearchComponent } from './page-search.component';

const routes: Routes = [{ path: '', component: PageSearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageSearchRoutingModule { }
