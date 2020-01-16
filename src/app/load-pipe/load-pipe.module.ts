import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadPipe } from './load.pipe';



@NgModule({
  declarations: [
    LoadPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadPipe,
  ]
})
export class LoadPipeModule { }
