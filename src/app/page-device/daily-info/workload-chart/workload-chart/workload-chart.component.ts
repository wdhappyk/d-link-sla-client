import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';

@Component({
  selector: 'app-workload-chart',
  templateUrl: './workload-chart.component.html',
  styleUrls: ['./workload-chart.component.scss']
})
export class WorkloadChartComponent implements OnInit {

  @Input() set data(data: { rx: number[], tx: number[] }) {
    this.chartData[0].data = data.tx;
    this.chartData[1].data = data.rx;
  }

  @Input() set timestamps(ls: number[]) {
    this.labels = ls.map((t) => moment(t).format('HH:mm'));
  }

  type: ChartType = 'line';
  chartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Tx',
      borderColor: '#00B060',
      backgroundColor: '#00B060',
      fill: false,
      pointRadius: 2,
      pointBackgroundColor: '#0A64A4',
      pointHoverBackgroundColor: '#0A64A4',
      pointBorderColor: '#0A64A4',
      pointHoverBorderColor: '#0A64A4',
    },
    {
      data: [],
      label: 'Rx',
      borderColor: '#FF9000',
      backgroundColor: '#FF9000',
      fill: false,
      pointRadius: 2,
      pointBackgroundColor: '#FF4500',
      pointHoverBackgroundColor: '#FF4500',
      pointBorderColor: '#FF4500',
      pointHoverBorderColor: '#FF4500',
    },
  ];
  options: ChartOptions = {
    scales: {
      xAxes: [{
        scaleLabel: { display: true, labelString: 'Time' },
      }],
      yAxes: [{
        scaleLabel: { display: true, labelString: 'Kbytes/s' },
      }],
    },
  };
  legend = true;
  labels = [];
  plugins: PluginServiceGlobalRegistrationAndOptions[] = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
  }
}
