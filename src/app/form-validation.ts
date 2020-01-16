import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export const ipv4RegExp = new RegExp('^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$');
export const ipv6RegExp = new RegExp('^((^|:)([0-9a-fA-F]{0,4})){1,8}$', 'i');
export const macRegExp = new RegExp('^([0-9a-fA-F]{2}([:-]|$)){6}$|([0-9a-fA-F]{4}([.]|$)){3}$', 'i');

export function ipValidator(control: AbstractControl): {[key: string]: any} | null {
  const ipv4Test = ipv4RegExp.test(control.value);
  const ipv6Test = ipv6RegExp.test(control.value);
  return (ipv4Test || ipv6Test) ? null : { forbiddenIP: control.value };
}

export function macValidator(control: AbstractControl): {[key: string]: any} | null {
  return macRegExp.test(control.value) ? null : { forbiddenMac: control.value };
}
