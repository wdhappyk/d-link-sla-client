import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SearchResultObject } from '../../interfaces';
import { DialogDeviceListInHostComponent } from '../../dialog-device-list-in-host-module/dialog-device-list-in-host/dialog-device-list-in-host.component';

export interface DialogData {
  host?: string;
  model: string;
  list: SearchResultObject[];
}

@Component({
  selector: 'app-dialog-device-list',
  templateUrl: './dialog-device-list.component.html',
  styleUrls: ['./dialog-device-list.component.scss'],
})
export class DialogDeviceListComponent implements OnInit {
  displayedColumns = ['n', 'id', '64bytes', 'drop', 'crc', 'fragments', 'linkDown', 'action'];
  dateFormat = 'DD-MM-YYYY HH:mm';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogDeviceListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

  openDeviceList(host: string) {
    const dialogRef = this.dialog.open(DialogDeviceListInHostComponent, {
      width: '400px',
      data: {
        host,
        parentRef: this.dialogRef,
      },
    });
  }
}
