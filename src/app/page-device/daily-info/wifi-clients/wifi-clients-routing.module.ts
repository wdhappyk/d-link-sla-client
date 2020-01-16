import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WifiClientsComponent } from './wifi-clients.component';

const routes: Routes = [{ path: '', component: WifiClientsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WifiClientsRoutingModule { }
