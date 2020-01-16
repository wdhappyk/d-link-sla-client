import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageSearchRoutingModule } from './page-search-routing.module';
import { PageSearchComponent } from './page-search.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatTableModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogDeviceListComponent } from './dialog-device-list/dialog-device-list.component';
import { DateFormatModule } from '../date-format/date-format.module';
// tslint:disable-next-line:max-line-length
import { DialogDeviceListInHostComponent } from '../dialog-device-list-in-host-module/dialog-device-list-in-host/dialog-device-list-in-host.component';
import { DialogDeviceListInHostModuleModule } from '../dialog-device-list-in-host-module/dialog-device-list-in-host-module.module';

@NgModule({
  declarations: [
    PageSearchComponent,
    DialogDeviceListComponent,
  ],
  imports: [
    CommonModule,
    PageSearchRoutingModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    DateFormatModule,
    MatListModule,
    DialogDeviceListInHostModuleModule,
  ],
  entryComponents: [
    DialogDeviceListComponent,
    DialogDeviceListInHostComponent,
  ],
})
export class PageSearchModule {}
