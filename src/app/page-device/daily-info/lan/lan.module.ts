import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanRoutingModule } from './lan-routing.module';
import { LanComponent } from './lan.component';
import { InfoModuleModule } from '../../../info-module/info-module.module';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { DropChartModule } from '../drop-chart/drop-chart.module';


@NgModule({
  declarations: [LanComponent],
  imports: [
    CommonModule,
    LanRoutingModule,
    InfoModuleModule,
    MatCardModule,
    DropChartModule,
    MatProgressSpinnerModule,
  ],
})
export class LanModule { }
