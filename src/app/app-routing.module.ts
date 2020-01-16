import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'sign-in', loadChildren: () => import('./page-sign-in/page-sign-in.module').then(m => m.PageSignInModule) },
  { path: 'dashboard', loadChildren: () => import('./page-dashboard/page-dashboard.module').then(m => m.PageDashboardModule) },
  { path: 'reports', loadChildren: () => import('./page-reports/page-reports.module').then(m => m.PageReportsModule) },
  { path: 'device', loadChildren: () => import('./page-device/page-device.module').then(m => m.PageDeviceModule) },
  { path: 'search', loadChildren: () => import('./page-search/page-search.module').then(m => m.PageSearchModule) },
  { path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
