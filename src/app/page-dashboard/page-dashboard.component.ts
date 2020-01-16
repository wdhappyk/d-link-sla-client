import { Component, OnInit } from '@angular/core';

import { SystemService } from '../system.service';
import { Device } from '../device';
import { MatDialog } from '@angular/material';
import { DialogDeviceListComponent } from './dialog-device-list/dialog-device-list.component';

export interface DataModel {
  model: string;
  count: number;
}

export interface DialogDeviceListData {
  model: string;
  deviceList: Device[];
}

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.scss'],
})
export class PageDashboardComponent implements OnInit {
  totalDevicesCount: number;
  lastHourReportsCount: number;
  deviceGroupList = {};
  models: DataModel[];

  constructor(
    private system: SystemService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.updateData();
  }

  openDeviceList(model: string) {
    const deviceList = this.deviceGroupList[model];
    const dialogRef = this.dialog.open(DialogDeviceListComponent, {
      width: '600px',
      data: {
        model,
        deviceList,
      },
    });
  }

  getTotalDevice() {
    this.system.getTotalDevices()
      .subscribe((devices: string[]) => {
        this.totalDevicesCount = devices.length;
      });
  }

  getLastHourReports() {
    this.system.getLastHourReports()
      .subscribe((count) => {
        this.lastHourReportsCount = count;
      });
  }

  getFirmwareInfo() {
    this.system.getFirmwareInfo()
      .subscribe((devices: Device[]) => {
        const ls = this.deviceGroupList;

        for (const device of devices) {
          if (!ls.hasOwnProperty(device.model)) {
            ls[device.model] = [];
          }
          ls[device.model].push(device);
        }

        this.models = Object.keys(ls).map((model) => ({
          model,
          count: ls[model].length,
        }));
      });

    // this.deviceGroupList = {
    //   first: [new Device('1', '', ''), new Device('2', '', '')],
    //   second: [new Device('1', '', '')],
    //   third: [new Device('1', '', '')],
    //   a1: [new Device('1', '', '')],
    //   a2: [new Device('1', '', '')],
    //   a3: [new Device('1', '', '')],
    //   a4: [new Device('1', '', '')],
    //   a5: [new Device('1', '', '')],
    //   a6: [new Device('1', '', '')],
    // };
    //
    // this.models = Object.keys(this.deviceGroupList).map((model) => ({
    //   model,
    //   count: this.deviceGroupList[model].length,
    // }));
  }

  updateData() {
    this.totalDevicesCount = null;
    this.lastHourReportsCount = null;
    this.deviceGroupList = {};
    this.models = null;

    this.getTotalDevice();
    this.getLastHourReports();
    this.getFirmwareInfo();
  }
}
