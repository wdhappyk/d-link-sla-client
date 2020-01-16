import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { DateFormatModule } from '../../date-format/date-format.module';
import { SignPipeModule } from '../../sign-pipe/sign-pipe.module';
import { InfoRowComponent } from '../../info-module/info-row/info-row.component';
import { InfoCardComponent } from '../../info-module/info-card/info-card.component';
// tslint:disable-next-line:max-line-length
import { DialogDeviceListInHostComponent } from '../../dialog-device-list-in-host-module/dialog-device-list-in-host/dialog-device-list-in-host.component';
import { DialogDeviceListInHostModuleModule } from '../../dialog-device-list-in-host-module/dialog-device-list-in-host-module.module';
import { InfoModuleModule } from '../../info-module/info-module.module';


@NgModule({
  declarations: [
    InfoComponent,
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    MatCardModule,
    DateFormatModule,
    MatProgressSpinnerModule,
    SignPipeModule,
    MatDividerModule,
    MatTableModule,
    MatTabsModule,
    DialogDeviceListInHostModuleModule,
    InfoModuleModule,
  ],
  entryComponents: [
    DialogDeviceListInHostComponent,
  ],
})
export class InfoModule {}
