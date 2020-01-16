import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WanRoutingModule } from './wan-routing.module';
import { WanComponent } from './wan.component';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { InfoModuleModule } from '../../../info-module/info-module.module';
import { WorkloadChartModule } from '../workload-chart/workload-chart.module';
import { ChartsModule } from 'ng2-charts';
import { DropChartModule } from '../drop-chart/drop-chart.module';


@NgModule({
  declarations: [WanComponent],
  imports: [
    CommonModule,
    WanRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    InfoModuleModule,
    WorkloadChartModule,
    ChartsModule,
    DropChartModule,
  ],
})
export class WanModule {}
