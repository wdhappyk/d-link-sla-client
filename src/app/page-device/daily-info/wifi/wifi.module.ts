import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WifiRoutingModule } from './wifi-routing.module';
import { WifiComponent } from './wifi.component';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTableModule,
} from '@angular/material';
import { WifiNoiseChartModule } from '../wifi-noise-chart/wifi-noise-chart.module';
import { DateFormatModule } from '../../../date-format/date-format.module';
import { TimePipeModule } from '../../../time-pipe/time-pipe.module';
import { WorkloadChartModule } from '../workload-chart/workload-chart.module';
import { InfoModuleModule } from '../../../info-module/info-module.module';
import { DialogClientsComponent } from './dialog-clients/dialog-clients.component';
import { MatDialog } from '@angular/material/dialog';

@NgModule({
  declarations: [WifiComponent, DialogClientsComponent],
  imports: [
    CommonModule,
    WifiRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    WifiNoiseChartModule,
    MatChipsModule,
    DateFormatModule,
    MatButtonModule,
    TimePipeModule,
    WorkloadChartModule,
    InfoModuleModule,
    MatTableModule,
    MatDialogModule,
  ],
  providers: [
    MatDialog,
  ],
  entryComponents: [
    DialogClientsComponent,
  ],
})
export class WifiModule { }
