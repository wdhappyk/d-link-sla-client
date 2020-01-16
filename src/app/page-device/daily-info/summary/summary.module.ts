import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { InfoModuleModule } from '../../../info-module/info-module.module';
import { DateFormatModule } from '../../../date-format/date-format.module';
import { ChartsModule } from 'ng2-charts';
import { WorkloadChartModule } from '../workload-chart/workload-chart.module';
import { WifiNoiseChartModule } from '../wifi-noise-chart/wifi-noise-chart.module';


@NgModule({
  declarations: [
    SummaryComponent,
  ],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    MatCardModule,
    InfoModuleModule,
    DateFormatModule,
    MatProgressSpinnerModule,
    ChartsModule,
    WorkloadChartModule,
    WifiNoiseChartModule,
  ],
})
export class SummaryModule {}
