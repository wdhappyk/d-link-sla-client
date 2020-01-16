import { Component, OnInit } from '@angular/core';
import { WANReport } from '../../../interfaces';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../system.service';

@Component({
  selector: 'app-wan',
  templateUrl: './wan.component.html',
  styleUrls: ['./wan.component.scss'],
})
export class WanComponent implements OnInit {
  mac: string;
  date: Date;
  reports: WANReport[];
  workloadWan: { rx: number[], tx: number[] } = {
    rx: [],
    tx: [],
  };
  workloadTimestamps: number[];
  dropData: ({ timestamp: Date | number, value: number })[] = [];

  get lastReport(): WANReport {
    const ls = this.reports;
    return ls && ls.length && ls[ls.length - 1];
  }

  constructor(
    private route: ActivatedRoute,
    private system: SystemService,
  ) { }

  ngOnInit() {
    const mac = this.route.parent.parent.parent.parent.snapshot.params.mac;
    const date = this.route.parent.parent.snapshot.params.date;
    this.mac = mac;
    this.date = moment(date, 'DD/MM/YYYY').toDate();

    this.getData();
  }

  getData() {
    this.system.getDailyWANReports(this.mac, this.date).subscribe((ls) => {
      this.reports = ls;

      this.workloadWan.rx = [];
      this.workloadWan.tx = [];
      this.workloadTimestamps = [];
      this.dropData = [];

      for (const item of ls) {
        this.dropData.push({ value: item.wan.drop, timestamp: item.timestamp });
        this.workloadWan.rx.push(this.calcWorkload(item.wan.rcv_bytes_diff));
        this.workloadWan.tx.push(this.calcWorkload(item.wan.snd_bytes_diff));
        this.workloadTimestamps.push(item.timestamp);
      }
    });
  }

  calcWorkload(n) {
    return Math.round(n / 5);
  }

  calcPacketSize(n: number) {
    return Math.round(n / 1024 * 100) / 100;
  }
}
