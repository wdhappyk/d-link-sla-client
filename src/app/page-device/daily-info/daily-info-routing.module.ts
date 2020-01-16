import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DailyInfoComponent } from './daily-info.component';

const routes: Routes = [
  { path: '', component: DailyInfoComponent },
  {
    path: ':date', component: DailyInfoComponent, children: [
      { path: 'summary', loadChildren: () => import('./summary/summary.module').then(m => m.SummaryModule) },
      { path: 'wan', loadChildren: () => import('./wan/wan.module').then(m => m.WanModule) },
      { path: 'lan', loadChildren: () => import('./lan/lan.module').then(m => m.LanModule) },
      { path: 'system', loadChildren: () => import('./system/system.module').then(m => m.SystemModule) },
      { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
      { path: 'wifi', loadChildren: () => import('./wifi/wifi.module').then(m => m.WifiModule) },
      { path: 'wifi-clients', loadChildren: () => import('./wifi-clients/wifi-clients.module').then(m => m.WifiClientsModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyInfoRoutingModule {}
