import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageDeviceRoutingModule } from './page-device-routing.module';
import { PageDeviceComponent } from './page-device.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material';
import {MatProgressSpinnerModule, } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

import { TimePipeModule } from '../time-pipe/time-pipe.module';


@NgModule({
  declarations: [
    PageDeviceComponent,
  ],
  imports: [
    CommonModule,
    PageDeviceRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    TimePipeModule,
    MatChipsModule,
  ],
  providers: [
    MatDatepickerModule,
  ],
})
export class PageDeviceModule {}
