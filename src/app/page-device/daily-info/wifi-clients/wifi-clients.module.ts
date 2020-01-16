import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WifiClientsRoutingModule } from './wifi-clients-routing.module';
import { WifiClientsComponent } from './wifi-clients.component';


@NgModule({
  declarations: [WifiClientsComponent],
  imports: [
    CommonModule,
    WifiClientsRoutingModule
  ]
})
export class WifiClientsModule { }
