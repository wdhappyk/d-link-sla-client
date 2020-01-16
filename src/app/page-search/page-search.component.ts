import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ipv4RegExp, ipv6RegExp, ipValidator, macRegExp, macValidator } from '../form-validation';
import { ErrorStateMatcher, MatDialog, MatSnackBar } from '@angular/material';
import { SystemService } from '../system.service';
import { SearchResultObject } from '../interfaces';
import { map, startWith } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';
import { DialogDeviceListComponent } from './dialog-device-list/dialog-device-list.component';
import { DialogData } from './dialog-device-list/dialog-device-list.component';

interface ResultGroup {
  [key: string]: SearchResultObject[];
}

export class AddressErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.value !== '' && control.invalid);
  }
}

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.scss'],
})
export class PageSearchComponent implements OnInit {

  searchForm = this.fb.group({
    ip: ['', ipValidator],
    mac: ['', macValidator],
  });
  filtersForm = this.fb.group({
    '64bytes': [''],
    drop: [''],
    crc: [''],
    fragments: [''],
    linkDown: [''],
    deviceModel: [''],
    deviceSoftware: [''],
    serialNumber: [''],
    ltDate: [''],
    gtDate: [''],
  });
  addressErrorStateMatcher = new AddressErrorStateMatcher();
  result: ResultGroup;
  isLoad = false;
  macList = [];
  ipList = [];
  filteredIpList: Observable<string[]>;
  filteredMacList: Observable<string[]>;
  displayedColumns = ['n', 'model', 'address', 'view'];
  totalNumberOfFound: number;
  isFilter = false;

  constructor(
    private snackBar: MatSnackBar,
    private system: SystemService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAutocomplete();
  }

  private _filter(ls: string[], value: string): string[] {
    const filterValue = value.toLowerCase();
    return ls.filter((v) => v.toLowerCase().indexOf(filterValue) !== -1);
  }

  search() {
    const { ip, mac } = this.searchForm.value;
    const isSearchByIP = ip !== '';
    const isSearchByMac = !isSearchByIP && mac === '' || mac !== '';

    const isIPIvnvalid = this.searchForm.controls.ip.invalid;
    const isMacInvalid = this.searchForm.controls.mac.invalid;

    if (isSearchByIP && isIPIvnvalid || isSearchByMac && mac !== '' && isMacInvalid) {
      this.openSnackBar('Incorrect data', 'Ok');
      return;
    }

    this.result = {};
    this.totalNumberOfFound = 0;

    if (isSearchByIP && isSearchByMac) {
      this.searchByIPAndMac(ip, mac);
    } else if (isSearchByIP) {
      this.searchByIP(ip);
    } else if (isSearchByMac) {
      this.searchByMac(mac || 'all');
    }
  }

  searchByMac(mac: string) {
    this.isLoad = true;
    const filter = this.isFilter ? this.filtersForm.value : null;
    this.system.getDevicesByMac(mac, filter)
      .subscribe((list) => {
        this.setResult(list);
        this.isLoad = false;
      });
  }

  searchByIP(ip: string) {
    this.isLoad = true;
    const filter = this.isFilter ? this.filtersForm.value : null;
    this.system.getDevicesByIP(ip, filter)
      .subscribe((list) => {
        this.setResult(list);
        this.isLoad = false;
      });
  }

  setResult(result) {
    this.result = this.groupResultsByModel(result);
    this.totalNumberOfFound = Object.values(this.result).reduce((sum, v) => sum + v.length, 0);
  }

  groupResultsByModel(ls) {
    const group: ResultGroup = {};

    for (const item of ls) {
      const model = item.model.join(' ') || 'Unknown';
      if (!group.hasOwnProperty(model)) {
        group[model] = [];
      }
      group[model].push(item);
    }

    return group;
  }

  searchByIPAndMac(ip: string, mac: string) {
    this.isLoad = true;
    this.system.getMacByIp(ip)
      .subscribe((macs) => {
        if (macs.length === 0) {
          this.isLoad = false;
          return;
        }
        const filter = this.isFilter ? this.filtersForm.value : null;
        const queryList = macs.map((m) => this.system.getDevicesByMac(m, filter));

        zip(...queryList).subscribe((ls: (SearchResultObject[])[]) => {
          const res: SearchResultObject[] = [];
          for (const objs of ls) {
            for (const obj of objs) {
              if (obj._id === mac) {
                res.push(obj);
              }
            }
          }
          this.setResult(res);
          this.isLoad = false;
        });
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getAutocomplete() {
    this.system.getMacList().subscribe((ls) => { this.macList = ls; });
    this.system.getIPList().subscribe((ls) => { this.ipList = ls; });

    this.filteredMacList = this.searchForm.controls.mac.valueChanges
      .pipe(
        startWith(''),
        map((value) => value ? this._filter(this.macList, value) : this.macList.slice()),
      );

    this.filteredIpList = this.searchForm.controls.ip.valueChanges
      .pipe(
        startWith(''),
        map((value) => value ? this._filter(this.ipList, value) : this.ipList.slice()),
      );
  }

  clearFilter() {
    this.filtersForm.reset();
  }

  openDeviceList(model: string, list: SearchResultObject[]) {
    if (list.length === 0) {
      return;
    }

    const data: DialogData = {
      model,
      list,
    };

    const id = list[0]._id;
    const isMac = macRegExp.test(id);

    if (!isMac) {
      data.host = id;
    }

    const dialogRef = this.dialog.open(DialogDeviceListComponent, {
      width: '1300px',
      data,
    });
  }
}
