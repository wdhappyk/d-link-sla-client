import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignPipe } from './sign.pipe';



@NgModule({
  declarations: [SignPipe],
  exports: [
    SignPipe,
  ],
  imports: [
    CommonModule,
  ],
})
export class SignPipeModule { }
