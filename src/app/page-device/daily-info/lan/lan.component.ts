import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LANReport } from '../../../interfaces';
import { SystemService } from '../../../system.service';
import * as moment from 'moment';

@Component({
  selector: 'app-lan',
  templateUrl: './lan.component.html',
  styleUrls: ['./lan.component.scss'],
})
export class LanComponent implements OnInit {

  mac: string;
  date: Date;
  port: string;
  reports: LANReport[];
  dropData: ({ timestamp: Date | number, value: number })[] = [];

  get lastReport(): LANReport {
    const ls = this.reports;
    return ls && ls.length && ls[ls.length - 1];
  }

  constructor(
    private route: ActivatedRoute,
    private system: SystemService,
  ) { }

  ngOnInit() {
    this.mac = this.route.parent.parent.parent.parent.snapshot.params.mac;
    this.date = moment(this.route.parent.parent.snapshot.params.date, 'DD/MM/YYYY').toDate();

    this.route.params.subscribe((params) => {
      this.port = params.port;
      this.getData();
    });
  }

  getData() {
    this.reports = null;
    this.system.getDailyLANReports(this.mac, this.date, this.port).subscribe((reports) => {
      this.reports = reports;
      this.dropData = [];

      for (const report of reports) {
        this.dropData.push({ timestamp: report.timestamp, value: report.log.drop });
      }
    });
  }

}
