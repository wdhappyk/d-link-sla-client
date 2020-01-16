import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageDeviceComponent } from './page-device.component';

const routes: Routes = [
  { path: '', component: PageDeviceComponent },
  {
    path: ':mac', component: PageDeviceComponent, children: [
      { path: '', redirectTo: 'log-list' },
      { path: 'log-list', loadChildren: () => import('./log-list/log-list.module').then(m => m.LogListModule) },
      { path: 'info/:timestamp', loadChildren: () => import('./info/info.module').then(m => m.InfoModule) },
      { path: 'daily', loadChildren: () => import('./daily-info/daily-info.module').then(m => m.DailyInfoModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDeviceRoutingModule {}
