import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { SystemService } from '../../system.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss'],
})
export class LogListComponent implements OnInit {
  targetDate: Date;
  mac: string;
  activeDayList: Date[];
  timestamps: Date[];
  isLoadTimestamps = false;
  timestampsDate: Date;

  get formattedTargetDate() {
    return this.targetDate && moment(this.targetDate).format('DD/MM/YYYY');
  }

  constructor(
    private route: ActivatedRoute,
    private system: SystemService,
  ) { }

  ngOnInit() {
    this.mac = this.route.parent.parent.snapshot.params.mac;
    this.updateData();
  }

  getDeviceActiveDayList() {
    return this.system.getDeviceActiveDayList(this.mac)
      .subscribe(
        (list) => {
          this.activeDayList = list.sort((a, b) => b.valueOf() - a.valueOf());
          if (this.activeDayList.length) {
            this.targetDate = this.activeDayList[0];
          }
        },
      );
  }

  updateData() {
    this.activeDayList = null;
    this.targetDate = null;
    this.timestamps = null;
    this.timestampsDate = null;
    this.getDeviceActiveDayList();
  }

  filterDate(d: Date): boolean {
    if (!this.activeDayList) {
      return false;
    }
    return this.activeDayList.some(
      (date) => date.toLocaleDateString() === d.toLocaleDateString(),
    );
  }

  getTimestampList() {
    if (!this.targetDate) {
      return;
    }
    this.timestampsDate = this.targetDate;
    this.timestamps = null;
    this.isLoadTimestamps = true;
    this.system.getTimestampList(this.mac, this.targetDate)
      .subscribe((timestamps) => {
        this.timestamps = timestamps;
        this.isLoadTimestamps = false;
      });
  }

}
