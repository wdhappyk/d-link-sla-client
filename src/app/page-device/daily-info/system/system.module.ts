import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { MatCardModule, MatChipsModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';
import { DateFormatModule } from '../../../date-format/date-format.module';


@NgModule({
  declarations: [SystemComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule,
    DateFormatModule,
    MatChipsModule,
  ],
})
export class SystemModule { }
