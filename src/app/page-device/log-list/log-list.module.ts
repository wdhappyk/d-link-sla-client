import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule, } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { NativeDateModule } from '@angular/material';

import { LogListRoutingModule } from './log-list-routing.module';
import { LogListComponent } from './log-list.component';
import { TimePipeModule } from '../../time-pipe/time-pipe.module';


@NgModule({
  declarations: [LogListComponent],
  imports: [
    CommonModule,
    LogListRoutingModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    TimePipeModule,
    NativeDateModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    MatDatepickerModule,
  ]
})
export class LogListModule { }
