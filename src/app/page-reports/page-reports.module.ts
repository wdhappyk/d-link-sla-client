import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

import { PageReportsRoutingModule } from './page-reports-routing.module';
import { PageReportsComponent } from './page-reports.component';
import { TimePipeModule } from '../time-pipe/time-pipe.module';


@NgModule({
  declarations: [
    PageReportsComponent,
  ],
  imports: [
    CommonModule,
    PageReportsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDividerModule,
    MatPaginatorModule,
    TimePipeModule,
  ],
  providers: [
    MatDatepickerModule,
  ],
})
export class PageReportsModule {}
