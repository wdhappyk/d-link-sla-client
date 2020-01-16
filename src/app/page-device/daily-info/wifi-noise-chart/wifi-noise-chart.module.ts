import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WifiNoiseChartComponent } from './wifi-noise-chart/wifi-noise-chart.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    WifiNoiseChartComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
  ],
  exports: [
    WifiNoiseChartComponent,
  ],
})
export class WifiNoiseChartModule {}
