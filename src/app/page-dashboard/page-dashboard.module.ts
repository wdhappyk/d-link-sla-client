import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';


import { PageDashboardRoutingModule } from './page-dashboard-routing.module';
import { PageDashboardComponent } from './page-dashboard.component';
import { LoadPipeModule } from '../load-pipe/load-pipe.module';
import { DevicesChartComponent } from './devices-chart/devices-chart.component';
import { DialogDeviceListComponent } from './dialog-device-list/dialog-device-list.component';

@NgModule({
  declarations: [
    PageDashboardComponent,
    DevicesChartComponent,
    DialogDeviceListComponent,
  ],
  imports: [
    CommonModule,
    PageDashboardRoutingModule,
    MatCardModule,
    MatListModule,
    LoadPipeModule,
    MatGridListModule,
    ChartsModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatDialogModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    MatDialog,
  ],
  entryComponents: [
    DialogDeviceListComponent,
  ],
})
export class PageDashboardModule {}
