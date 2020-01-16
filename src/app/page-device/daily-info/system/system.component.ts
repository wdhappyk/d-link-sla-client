import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../system.service';
import * as moment from 'moment';
import { SystemReport } from '../../../interfaces';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit {
  mac: string;
  date: Date;
  timestamps: number[];

  constructor(
    private route: ActivatedRoute,
    private system: SystemService,
  ) { }

  ngOnInit() {
    this.mac = this.route.parent.parent.parent.parent.snapshot.params.mac;
    this.date = moment(this.route.parent.parent.snapshot.params.date, 'DD/MM/YYYY').toDate();

    this.getData();
  }

  getData() {
    this.timestamps = null;
    this.system.getDailySystemReports(this.mac, this.date).subscribe((reports) => {
      this.timestamps = reports.map((r) => r.timestamp);
    });
  }

}
