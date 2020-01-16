import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private system: SystemService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  signOut(): void {
    this.router.navigate(['/']);
    this.system.signOut();
  }

}
