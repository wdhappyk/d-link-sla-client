import { Component, OnInit } from '@angular/core';
import { SummaryReport } from '../../../interfaces';
import { SystemService } from '../../../system.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  mac: string;
  date: Date;
  reports: SummaryReport[];
  lastActiveDay: Date;
  dateFormat = 'DD/MM/YYYY';
  workloadWan: { rx: number[], tx: number[] } = {
    rx: [],
    tx: [],
  };
  workloadTimestamps: number[];

  get info(): SummaryReport {
    return this.reports && this.reports[0];
  }

  get lastInfo(): SummaryReport {
    const ls = this.reports;
    return ls && ls.length && ls[ls.length - 1];
  }

  constructor(
    private system: SystemService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const mac = this.route.parent.parent.parent.parent.snapshot.params.mac;
    const date = this.route.parent.parent.snapshot.params.date;

    this.mac = mac;
    this.date = moment(date, this.dateFormat).toDate();

    this.getLastActiveDay();
    this.getReports();
  }

  getLastActiveDay() {
    this.system.getDeviceActiveDayList(this.mac).subscribe((ls) => {
      if (!ls.length) { return; }
      this.lastActiveDay = ls[ls.length - 1];
    });
  }

  getReports() {
    this.system.getDailySummaryReports(this.mac, this.date)
      .subscribe((ls) => {
        this.reports = ls;

        this.workloadWan.rx = [];
        this.workloadWan.tx = [];
        this.workloadTimestamps = [];

        const calcWorkload = (n) => Math.round(n / 5);

        for (const item of ls) {
          this.workloadWan.rx.push(calcWorkload(item.wan.rcv_bytes_diff));
          this.workloadWan.tx.push(calcWorkload(item.wan.snd_bytes_diff));
          this.workloadTimestamps.push(item.timestamp);
        }
      });
  }

  calcPackets(n: number) {
    return Math.trunc(n / 1e3);
  }

  calcBytes(n: number) {
    return Math.trunc(n / 1e3);
  }
}
