import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';

@Component({
  selector: 'app-drop-chart',
  templateUrl: './drop-chart.component.html',
  styleUrls: ['./drop-chart.component.scss'],
})
export class DropChartComponent implements OnInit {

  @Input() set data(data: ({ timestamp: Date | number, value: number })[]) {
    const ls = [];
    const labels = [];

    for (const item of data) {
      ls.push(item.value);
      labels.push(moment(item.timestamp).format('HH:mm'));
    }

    this.labels = labels;
    this.chartData[0].data = ls;
  }

  type: ChartType = 'line';
  chartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Packets',
      borderColor: '#FF0000',
      backgroundColor: '#FF0000',
      fill: false,
      pointRadius: 2,
      pointBackgroundColor: '#A60000',
      pointHoverBackgroundColor: '#A60000',
      pointBorderColor: '#A60000',
      pointHoverBorderColor: '#A60000',
    },
  ];
  options: ChartOptions = {
    scales: {
      xAxes: [{
        scaleLabel: { display: true, labelString: 'Time' },
      }],
      yAxes: [{
        ticks: { display: true, beginAtZero: true },
        scaleLabel: { display: true, labelString: 'Packets' },
      }],
    },
  };
  legend = false;
  labels = [];
  plugins: PluginServiceGlobalRegistrationAndOptions[] = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
  }
}
