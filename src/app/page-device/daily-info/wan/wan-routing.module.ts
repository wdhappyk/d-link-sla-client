import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WanComponent } from './wan.component';

const routes: Routes = [{ path: '', component: WanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WanRoutingModule { }
