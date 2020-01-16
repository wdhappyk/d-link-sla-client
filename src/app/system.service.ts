import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

import { User } from './user';
import { Device } from './device';
import {
  AuthorizeData,
  HostLog,
  InfoReport,
  LANReport,
  Report,
  SearchFilter,
  SearchResultObject,
  ShortReport,
  SummaryReport,
  SystemReport,
  WANReport,
  WiFiReport,
} from './interfaces';

interface HttpOptions {
  headers: HttpHeaders;
}

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  urlApi = 'http://localhost:3000';
  httpOptions: HttpOptions;
  isAuth = false;
  user: User;
  emptySearchFilter: SearchFilter = {
    '64bytes': 'null',
    drop: 'null',
    crc: 'null',
    fragments: 'null',
    linkDown: 'null',
    deviceModel: 'null',
    deviceSoftware: 'null',
    serialNumber: 'null',
    ltDate: 'null',
    gtDate: 'null',
  };
  storageAuthData = localStorage;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private cookie: CookieService,
  ) {}

  handleApiError() {
    return (err: any) => {
      if (err.status === 401) {
        this.signOut();

        this.snackBar.open(`Error: ${err.error.toLowerCase()}`, null, {
          duration: 2000,
        });
      }

      return throwError(err);
    };
  }

  signIn(username = '', password = ''): Observable<boolean> {
    const md5 = new Md5();
    const body = {
      username,
      password: md5.appendStr(password).end(),
    };

    return new Observable<boolean>((observer) => {
      const request = this.http.post<AuthorizeData>(`${this.urlApi}/login`, body)
        .subscribe(
          (value) => {
            this.httpOptions = {
              headers: new HttpHeaders({
                Token: value.token,
              }),
            };
            this.isAuth = true;

            this.storageAuthData.setItem('username', username);
            this.storageAuthData.setItem('password', password);
            observer.complete();
          },
          () => {
            observer.error();
          },
        );

      return {
        unsubscribe(): void {
          request.unsubscribe();
        },
      };
    });
  }

  signOut(): void {
    this.httpOptions = null;
    this.isAuth = false;
    this.user = null;
    this.storageAuthData.clear();
    this.cookie.deleteAll();
    this.router.navigate(['/sign-in']);
  }

  getTotalDevices(): Observable<string[]> {
    const url = `${this.urlApi}/info/totalDevices`;
    return this.http.get<string[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getLastHourReports(): Observable<number> {
    const url = `${this.urlApi}/logs/lasthour/${Date.now()}`;
    return this.http.get<number>(url, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getFirmwareInfo(): Observable<Device[]> {
    const url = `${this.urlApi}/info/firmware`;
    return this.http.get<Device[]>(url, this.httpOptions)
      .pipe(
        map((devices) => {
          const ls: Map<string, Device> = new Map();

          for (const device of devices) {
            const mac = device[1];

            if (ls.has(mac)) {
              continue;
            }

            const { model, version } = device[0];
            ls.set(mac, new Device(mac, model, version));
          }

          return Array.from(ls.values());
        }),
        catchError(this.handleApiError()),
      );
  }

  getReportsByDate(date: Date | number): Observable<ShortReport[]> {
    const formatDate = moment(date).format('DD/MM/YYYY');
    const url = `${this.urlApi}/report/${formatDate}`;
    return this.http.get<ShortReport[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getDeviceActiveDayList(mac: string): Observable<Date[]> {
    const url = `${this.urlApi}/activeday/${mac}`;
    return this.http.get<string[]>(url, this.httpOptions)
      .pipe(
        map((dates) => {
          return dates.map((date) => moment(date, 'DD/MM/YYYY').toDate());
        }),
        catchError(this.handleApiError()),
      );
  }

  getTimestampList(mac: string, date: Date | number): Observable<Date[]> {
    const formatDate = moment(date).format('DD/MM/YYYY');
    const url = `${this.urlApi}/logs/timestamps/${mac}/${formatDate}`;
    return this.http.get<number[]>(url, this.httpOptions)
      .pipe(
        map((timestamps) => {
          return timestamps.map((timestamp) => new Date(timestamp));
        }),
        catchError(this.handleApiError()),
      );
  }

  getDeviceInfoByTimestamp(mac: string, date: Date | number): Observable<Report> {
    const url = `${this.urlApi}/info/${mac}/${date.valueOf()}`;
    return this.http.get<Report>(url, this.httpOptions)
      .pipe(
        map((report) => this.processReport(report)),
        catchError(this.handleApiError()),
      );
  }

  getLogInfo(type: 'prev' | 'next', mac: string, date: Date | number): Observable<Report> {
    const url = `${this.urlApi}/logs/info/${type}/${mac}/${date.valueOf()}`;
    return this.http.get<Report[]>(url, this.httpOptions)
      .pipe(
        map((ls) => {
          return ls.length ? this.processReport(ls[0]) : null;
        }),
        catchError(this.handleApiError()),
      );
  }

  processReport(report: Report) {
    const split = (log: HostLog): void => {
      log.result = log.result.toString().split('\n');
    };

    const process = (ls: HostLog[]): void => {
      if (!ls) { return; }
      for (const item of ls) {
        split(item);
      }
    };

    process(report.ping);
    process(report.trcrt);

    return report;
  }

  getDevicesByMac(mac = 'all', filter?: SearchFilter): Observable<SearchResultObject[]> {
    if (mac.trim() === '') {
      return of([]);
    }
    const url = `${this.urlApi}/macs/${mac}`;
    const body = {};

    this.cookie.set('filters', JSON.stringify(filter || this.emptySearchFilter), null, '/', 'localhost');
    return this.http.post<SearchResultObject[]>(url, body, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getDevicesByIP(ip: string, filter?: SearchFilter): Observable<SearchResultObject[]> {
    const url = `${this.urlApi}/ips/${ip}`;
    const body = {};

    this.cookie.set('filters', JSON.stringify(filter || this.emptySearchFilter), null, '/', 'localhost');
    return this.http.post<SearchResultObject[]>(url, body, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getIPList(): Observable<string[]> {
    const url = `${this.urlApi}/ips`;
    return this.http.get<string[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getMacList(): Observable<string[]> {
    const url = `${this.urlApi}/macs`;
    return this.http.get<string[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getMacByIp(ip: string): Observable<string[]> {
    const url = `${this.urlApi}/macs/ip/${ip}`;
    return this.http.get<string[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getDailyInfo(mac: string, date: Date | number): Observable<InfoReport[]> {
    const formatDate = moment(date).format('DD/MM/YYYY');
    const url = `${this.urlApi}/daily/info/${mac}/${formatDate}`;
    return this.http.get<InfoReport[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getDailySummaryReports(mac: string, date: Date | number): Observable<SummaryReport[]> {
    const formatDate = moment(date).format('DD/MM/YYYY');
    const url = `${this.urlApi}/daily/summary/${mac}/${formatDate}`;
    return this.http.get<SummaryReport[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getDailyWANReports(mac: string, date: Date | number): Observable<WANReport[]> {
    const formatDate = moment(date).format('DD/MM/YYYY');
    const url = `${this.urlApi}/daily/wan/${mac}/${formatDate}`;
    return this.http.get<WANReport[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getDailyLANReports(mac: string, date: Date | number, port: string): Observable<LANReport[]> {
    const formatDate = moment(date).format('DD/MM/YYYY');
    const url = `${this.urlApi}/daily/lan/${port}/${mac}/${formatDate}`;
    return this.http.get<LANReport[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getDailySystemReports(mac: string, date: Date | number): Observable<SystemReport[]> {
    const formatDate = moment(date).format('DD/MM/YYYY');
    const url = `${this.urlApi}/daily/system/${mac}/${formatDate}`;
    return this.http.get<SystemReport[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getEventsTimestamps(mac: string, date: Date | number): Observable<number[]> {
    const formatDate = moment(date).format('DD/MM/YYYY');
    const url = `${this.urlApi}/events/timestamps/${mac}/${formatDate}`;
    return this.http.get<number[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }

  getDailyWiFiReports(mac: string, date: Date | number, freq: string): Observable<WiFiReport[]> {
    const formatDate = moment(date).format('DD/MM/YYYY');
    const url = `${this.urlApi}/daily/wifi/${freq}/${mac}/${formatDate}`;
    return this.http.get<WiFiReport[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleApiError()),
      );
  }
}
