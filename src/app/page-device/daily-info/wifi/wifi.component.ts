import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../system.service';
import * as moment from 'moment';
import { WiFiMbssidObject, WiFiReport } from '../../../interfaces';
import { MatDialog } from '@angular/material';
import { DialogClientsComponent } from './dialog-clients/dialog-clients.component';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss'],
})
export class WifiComponent implements OnInit {
  mac: string;
  date: Date;
  freq: string;
  reports: WiFiReport[];
  workloadData: { rx: number[], tx: number[] } = {
    rx: [],
    tx: [],
  };
  workloadTimestamps: number[];
  selectedReport: WiFiReport;
  displayedColumns = ['time', 'clients', 'action'];

  get lastLog(): WiFiMbssidObject {
    const ls = this.reports;
    if (ls && ls.length) {
      const logList = ls[0].log;
      return logList.length && logList[0];
    }
    return null;
  }

  constructor(
    private route: ActivatedRoute,
    private system: SystemService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.mac = this.route.parent.parent.parent.parent.snapshot.params.mac;
    this.date = moment(this.route.parent.parent.snapshot.params.date, 'DD/MM/YYYY').toDate();
    this.route.params.subscribe((params) => {
      this.freq = params.freq;
      this.getData();
    });
  }

  getData() {
    this.reports = null;
    this.system.getDailyWiFiReports(this.mac, this.date, this.freq).subscribe((reports) => {
      this.reports = reports;

      this.workloadData.rx = [];
      this.workloadData.tx = [];
      this.workloadTimestamps = [];

      const calcWorkload = (n: number): number => Math.round(n / 5);

      for (const item of reports) {
        if (item.log && item.log.length) {
          const log = item.log[0];
          if (log.rcv_bytes_diff && log.snd_bytes_diff) {
            this.workloadData.rx.push(calcWorkload(log.rcv_bytes_diff));
            this.workloadData.tx.push(calcWorkload(log.snd_bytes_diff));
          }
          this.workloadTimestamps.push(item.timestamp);
        }
      }

      this.selectedReport = reports.length ? reports[0] : null;
    });
  }

  calcSize(n: number) {
    return Math.round(n / 1024 * 10) / 10;
  }

  openClientList(report: WiFiReport) {
    const dialogRef = this.dialog.open(DialogClientsComponent, {
      width: '1000px',
      data: {
        time: report.timestamp,
        clients: report.log[0].clients,
      },
    });
  }
}
