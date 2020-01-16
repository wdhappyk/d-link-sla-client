import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDeviceListInHostComponent } from './dialog-device-list-in-host/dialog-device-list-in-host.component';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DialogDeviceListInHostComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
  ],
  entryComponents: [
    DialogDeviceListInHostComponent,
  ],
  exports: [
    DialogDeviceListInHostComponent,
  ],
})
export class DialogDeviceListInHostModuleModule {}
