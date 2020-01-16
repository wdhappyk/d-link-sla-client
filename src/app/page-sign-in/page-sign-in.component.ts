import { Component } from '@angular/core';
import { SystemService } from '../system.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-page-sign-in',
  templateUrl: './page-sign-in.component.html',
  styleUrls: ['./page-sign-in.component.scss'],
})
export class PageSignInComponent {
  isLoad = false;
  signInForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private system: SystemService,
    private snackBar: MatSnackBar,
  ) {}

  signIn(): void {
    if (this.isLoad) {
      return;
    }
    if (!this.signInForm.valid) {
      this.openSnackBar('Incorrect data', 'Ok');
      return;
    }

    const { username, password } = this.signInForm.value;
    this.isLoad = true;

    this.system.signIn(username, password)
      .subscribe({
        complete: () => {
          this.router.navigate(['/']);
          this.isLoad = false;
        },
        error: () => {
          this.openSnackBar('Invalid data', 'Ok');
          this.isLoad = false;
        },
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
