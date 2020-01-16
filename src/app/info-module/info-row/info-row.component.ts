import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-row',
  templateUrl: './info-row.component.html',
  styleUrls: ['./info-row.component.scss'],
})
export class InfoRowComponent implements OnInit {
  @Input() label: string;
  @Input() value: any;
  @Input() unit?: string;
  @Input() diff?: number;
  @Input() noValue?: boolean;

  constructor() { }

  ngOnInit() {
  }

}
