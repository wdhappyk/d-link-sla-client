import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { SystemService } from './system.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading = false;
  isTrySignIn = false;

  constructor(
    private router: Router,
    private system: SystemService,
  ) {
    this.trySignIn();
    this.enableLoader();
  }

  trySignIn(): void {
    const username = this.system.storageAuthData.getItem('username');
    const password = this.system.storageAuthData.getItem('password');

    if (username && password) {
      this.isTrySignIn = true;
      this.system.signIn(username, password)
        .subscribe({
          complete: () => {
            this.isTrySignIn = false;
          },
          error: () => {
            this.router.navigate(['/sign-in']);
            this.isTrySignIn = false;
          },
        });
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  enableLoader(): void {
    this.router.events.subscribe(
      (event) => {
        const navState = this.getCurrentNavigationState(this.router);
        if (navState && navState.ignoreAppLoader) {
          return;
        }

        if (event instanceof NavigationStart) {
          this.isLoading = true;
        } else if (event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel) {
          this.isLoading = false;
        }
      },
    );
  }

  private getCurrentNavigationState(router: any) {
    const currentNavigation = router.getCurrentNavigation && router.getCurrentNavigation();
    if (currentNavigation && currentNavigation.extras) {
      return currentNavigation.extras.state;
    }

    return {};
  }
}
