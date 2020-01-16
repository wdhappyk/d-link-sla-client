import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SystemService } from '../../system.service';
import { Report } from '../../interfaces';
import { MatDialog } from '@angular/material';
import { DialogDeviceListInHostComponent } from '../../dialog-device-list-in-host-module/dialog-device-list-in-host/dialog-device-list-in-host.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  mac: string;
  date: Date;
  info: Report;
  prevLogInfo: Report;
  nextLogInfo: Report;
  dateFormat = 'HH:mm:ss DD-MM-YYYY';
  isError = false;
  isPrevNothing = false;
  isNextNothing = false;
  displayedColumns = ['n', 'hostname', 'mac', 'ip', 'rssi', 'rx/tx', 'workload rx/tx'];

  constructor(
    private route: ActivatedRoute,
    private system: SystemService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const timestamp = +this.route.snapshot.params.timestamp;
      this.mac = this.route.parent.parent.snapshot.params.mac;
      this.date = new Date(timestamp);
      this.isError = false;

      if (this.prevLogInfo && timestamp === this.prevLogInfo.timestamp) {
        this.nextLogInfo = this.info;
        this.isNextNothing = false;
        this.info = this.prevLogInfo;
        this.prevLogInfo = null;
        this.getPrevLogInfo();
      } else if (this.nextLogInfo && timestamp === this.nextLogInfo.timestamp) {
        this.prevLogInfo = this.info;
        this.isPrevNothing = false;
        this.info = this.nextLogInfo;
        this.nextLogInfo = null;
        this.getNextLogInfo();
      } else {
        this.info = null;
        this.prevLogInfo = null;
        this.isPrevNothing = false;
        this.getInfo();
        this.getPrevLogInfo();
        this.getNextLogInfo();
      }
    });
  }

  getInfo(): void {
    this.system.getDeviceInfoByTimestamp(this.mac, this.date)
      .subscribe(
        (info: Report) => {
          this.info = info;

          if (!info) {
            this.isError = true;
          }
        },
        (error) => {
          this.isError = true;
        });
  }

  getPrevLogInfo(): void {
    this.system.getLogInfo('prev', this.mac, this.date)
      .subscribe(
        (info: Report) => {
          this.prevLogInfo = info;
          this.isPrevNothing = !info;
        },
        (error) => {
          this.isError = true;
        },
      );
  }

  getNextLogInfo(): void {
    this.system.getLogInfo('next', this.mac, this.date)
      .subscribe(
        (info: Report) => {
          this.nextLogInfo = info;
          this.isNextNothing = !info;
        },
        (error) => {
          this.isError = true;
        },
      );
  }

  calcWorkload(n: number, t = 0): number {
    const i = Math.pow(10, t);
    return n ? Math.round(n / 5 * i) / i : 0;
  }

  calcData(x: number) {
    return Math.round(x / 10) / 100;
  }

  sortNoise(a, b) {
    return a.key - b.key;
  }

  openHostList(host: string) {
    this.dialog.open(DialogDeviceListInHostComponent, {
      width: '400px',
      data: {
        host,
      },
    });
  }
}
