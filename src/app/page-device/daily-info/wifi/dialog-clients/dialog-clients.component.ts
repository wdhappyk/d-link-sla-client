import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WiFiMbssidClient } from '../../../../interfaces';

@Component({
  selector: 'app-dialog-clients',
  templateUrl: './dialog-clients.component.html',
  styleUrls: ['./dialog-clients.component.scss']
})
export class DialogClientsComponent implements OnInit {

  displayedColumns = ['n', 'hostname', 'mac', 'ip', 'rssi', 'rx/tx', 'workload rx/tx'];

  constructor(
    public dialogRef: MatDialogRef<DialogClientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { time: Date | number, clients: WiFiMbssidClient[] },
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

  calcWorkload(n: number, t = 0): number {
    const i = Math.pow(10, t);
    return n ? Math.round(n / 5 * i) / i : 0;
  }

  calcData(x: number) {
    return Math.round(x / 10) / 100;
  }
}
