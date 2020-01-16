import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card/info-card.component';
import { InfoRowComponent } from './info-row/info-row.component';
import { MatCardModule } from '@angular/material';
import { SignPipeModule } from '../sign-pipe/sign-pipe.module';


@NgModule({
  declarations: [
    InfoCardComponent,
    InfoRowComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    SignPipeModule,
  ],
  exports: [
    InfoCardComponent,
    InfoRowComponent,
  ],
})
export class InfoModuleModule {}
