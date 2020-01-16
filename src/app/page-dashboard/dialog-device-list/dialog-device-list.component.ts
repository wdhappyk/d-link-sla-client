import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogDeviceListData } from '../page-dashboard.component';

@Component({
  selector: 'app-dialog-device-list',
  templateUrl: './dialog-device-list.component.html',
  styleUrls: ['./dialog-device-list.component.scss'],
})
export class DialogDeviceListComponent implements OnInit {

  displayedColumns = ['n', 'mac', 'version', 'detail'];

  constructor(
    public dialogRef: MatDialogRef<DialogDeviceListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDeviceListData,
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }
}
