import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { SystemService } from '../system.service';
import { ShortReport } from '../interfaces';

@Component({
  selector: 'app-page-reports',
  templateUrl: './page-reports.component.html',
  styleUrls: ['./page-reports.component.scss'],
})
export class PageReportsComponent implements OnInit {
  private dateValue: Date;
  reports: ShortReport[];
  displayedColumns = ['n', 'device', 'mac', 'ip', 'time', 'detail'];
  dataSource: MatTableDataSource<ShortReport> = new MatTableDataSource<ShortReport>();

  get date() {
    return this.dateValue;
  }

  set date(v: Date) {
    this.dateValue = v;
    this.getReports();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions = [5, 10, 20, 50];

  constructor(
    private system: SystemService,
  ) { }

  ngOnInit() {
    this.date = new Date();
    this.dataSource.paginator = this.paginator;
  }

  getReports() {
    this.reports = null;
    this.system.getReportsByDate(this.date)
      .subscribe((reports: ShortReport[]) => {
        this.reports = reports;
        this.dataSource.data = reports;
        this.paginator.pageIndex = 0;
      });
  }

}
