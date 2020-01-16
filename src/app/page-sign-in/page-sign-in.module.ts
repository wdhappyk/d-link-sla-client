import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageSignInRoutingModule } from './page-sign-in-routing.module';
import { PageSignInComponent } from './page-sign-in.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule, MatProgressSpinnerModule,
  MatSnackBarModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PageSignInComponent],
  imports: [
    CommonModule,
    PageSignInRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
})
export class PageSignInModule {}
