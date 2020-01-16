import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-page-device',
  templateUrl: './page-device.component.html',
  styleUrls: ['./page-device.component.scss']
})
export class PageDeviceComponent implements OnInit {
  mac: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.mac = this.route.snapshot.params.mac;
  }
}
