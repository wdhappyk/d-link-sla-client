import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageReportsComponent } from './page-reports.component';

const routes: Routes = [{ path: '', component: PageReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageReportsRoutingModule { }
