import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { InfoReport } from '../../interfaces';
import * as moment from 'moment';
import { SystemService } from '../../system.service';

@Component({
  selector: 'app-daily-info',
  templateUrl: './daily-info.component.html',
  styleUrls: ['./daily-info.component.scss'],
})
export class DailyInfoComponent implements OnInit {
  navState = { ignoreAppLoader: true, localLoader: true };
  isLoading = false;
  openedLan = false;
  mac: string;
  date: Date;
  infoReports: InfoReport[];
  lanPorts: string[];
  wifiFreqList: string[];
  openedWifi = false;
  activeDayList: Date[];

  get targetDate() {
    return this.date;
  }

  set targetDate(date) {
    this.date = date;


    const activePathParams = this.activePathParams;
    const params = [];

    if (activePathParams) {
      const keys = Object.keys(activePathParams);
      for (const key of keys) {
        params.push(activePathParams[key]);
      }
    }

    this.router.navigate(['device', this.mac, 'daily', moment(date).format('DD/MM/YYYY'), this.activePath, ...params]);
  }

  get activePath() {
    return this.route.firstChild ? this.route.firstChild.routeConfig.path : null;
  }

  get activePathParams() {
    const activePath = this.route.firstChild;
    return activePath && activePath.firstChild ? this.route.firstChild.firstChild.snapshot.params : null;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private system: SystemService,
  ) {}

  ngOnInit() {
    this.enableLoader();

    this.route.params.subscribe((params) => {
      this.mac = this.route.parent.parent.snapshot.params.mac;
      this.date = moment(this.route.snapshot.params.date, 'DD/MM/YYYY').toDate();

      this.getInfo();
      this.getDeviceActiveDayList();

      if (this.activePath) {
        this.openedLan = this.activePath === 'lan';
        this.openedWifi = this.activePath === 'wifi';
      }
    });

    this.router.events.subscribe(
      (event) => {
        const navState = this.getCurrentNavigationState(this.router);
        if (navState && !navState.localLoader || !(event instanceof NavigationEnd)) {
          return;
        }
      },
    );
  }

  getDeviceActiveDayList() {
    return this.system.getDeviceActiveDayList(this.mac)
      .subscribe(
        (list) => {
          this.activeDayList = list.sort((a, b) => b.valueOf() - a.valueOf());
        },
      );
  }

  filterDate(d: Date): boolean {
    if (!this.activeDayList) {
      return false;
    }
    return this.activeDayList.some(
      (date) => date.toLocaleDateString() === d.toLocaleDateString(),
    );
  }

  getInfo() {
    this.infoReports = null;

    this.system.getDailyInfo(this.mac, this.date).subscribe((ls) => {
      this.infoReports = ls;

      const wifiFreqList = new Set<string>();
      const lanPorts = new Set<string>();

      for (const info of ls) {
        if (info.lan && info.lan.length) {
          for (const lan of info.lan) {
            lanPorts.add(lan.name);
          }
        }
        if (info.wifi && info.wifi.mbssid && info.wifi.mbssid.length) {
          for (const mbssid of info.wifi.mbssid) {
            wifiFreqList.add(mbssid.freq);
          }
        }
      }

      this.wifiFreqList = Array.from(wifiFreqList);
      this.lanPorts = Array.from(lanPorts);
    });
  }

  enableLoader() {
    this.router.events.subscribe(
      (event) => {
        const navState = this.getCurrentNavigationState(this.router);
        if (navState && !navState.localLoader) {
          return;
        }

        if (event instanceof NavigationStart) {
          this.isLoading = true;
        } else if (event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel) {
          this.isLoading = false;
        }
      },
    );
  }

  private getCurrentNavigationState(router: any) {
    const currentNavigation = router.getCurrentNavigation && router.getCurrentNavigation();
    if (currentNavigation && currentNavigation.extras) {
      return currentNavigation.extras.state;
    }

    return {};
  }

}
