import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SystemService } from '../../system.service';

@Component({
  selector: 'app-dialog-device-list-in-host',
  templateUrl: './dialog-device-list-in-host.component.html',
  styleUrls: ['./dialog-device-list-in-host.component.scss'],
})
export class DialogDeviceListInHostComponent implements OnInit {

  macList: string[];

  constructor(
    private system: SystemService,
    public dialogRef: MatDialogRef<DialogDeviceListInHostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { host: string, parentRef?: MatDialogRef<Component> },
  ) { }

  ngOnInit() {
    this.system.getMacByIp(this.data.host).subscribe((list) => this.macList = list);
  }

  onClose() {
    this.dialogRef.close();
  }

  onCloseAll() {
    this.onClose();
    if (this.data.parentRef) {
      this.data.parentRef.close();
    }
  }
}
