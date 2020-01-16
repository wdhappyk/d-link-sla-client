import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropChartComponent } from './drop-chart/drop-chart.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    DropChartComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
  ],
  exports: [
    DropChartComponent,
  ],
})
export class DropChartModule {}
