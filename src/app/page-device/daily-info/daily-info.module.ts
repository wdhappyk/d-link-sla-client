import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyInfoRoutingModule } from './daily-info-routing.module';
import { DailyInfoComponent } from './daily-info.component';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DailyInfoComponent],
  imports: [
    CommonModule,
    DailyInfoRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
})
export class DailyInfoModule { }
