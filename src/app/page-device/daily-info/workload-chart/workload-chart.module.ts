import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkloadChartComponent } from './workload-chart/workload-chart.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    WorkloadChartComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
  ],
  exports: [
    WorkloadChartComponent,
  ],
})
export class WorkloadChartModule {}
