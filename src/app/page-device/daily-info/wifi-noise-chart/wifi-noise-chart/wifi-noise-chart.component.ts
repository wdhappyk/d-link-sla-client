import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { WiFiObject, WiFiReport } from '../../../../interfaces';

@Component({
  selector: 'app-wifi-noise-chart',
  templateUrl: './wifi-noise-chart.component.html',
  styleUrls: ['./wifi-noise-chart.component.scss'],
})
export class WifiNoiseChartComponent implements OnInit {

  @Input() set wifi(wifi: WiFiObject | WiFiReport) {
    const data = this.data[0];
    data.backgroundColor = [];
    data.hoverBackgroundColor = [];
    data.borderColor = [];
    data.hoverBorderColor = [];
    data.data = [];
    this.labels = [];

    if (!wifi) {
      return;
    }

    const mbssid = 'log' in wifi ? wifi.log : wifi.mbssid;
    const selectedChannel = mbssid.map((m) => m.channel);

    for (const channel in wifi.noise) {
      if (!wifi.noise.hasOwnProperty(channel)) { continue; }
      const value = wifi.noise[channel];
      const isSelected = selectedChannel.includes(+channel);

      if (+channel < 36) {
        const rgb = isSelected ? '10, 100, 164' : '0, 176, 96';
        data.backgroundColor.push(`rgba(${rgb}, .5)`);
        data.hoverBackgroundColor.push(`rgba(${rgb}, .7)`);
        data.borderColor.push(`rgb(${rgb})`);
        data.hoverBorderColor.push(`rgb(${rgb})`);
      } else {
        const rgb = isSelected ? '255, 69, 0' : '255, 144, 0';
        data.backgroundColor.push(`rgba(${rgb}, .5)`);
        data.hoverBackgroundColor.push(`rgba(${rgb}, .7)`);
        data.borderColor.push(`rgb(${rgb})`);
        data.hoverBorderColor.push(`rgb(${rgb})`);
      }

      data.data.push(value);
      this.labels.push(channel);
    }
  }

  data: ChartDataSets[] = [
    {
      backgroundColor: [],
      hoverBackgroundColor: [],
      borderColor: [],
      data: [],
      borderWidth: 2,
    },
  ];
  labels = [];
  options: ChartOptions = {
    responsive: true,
    legend: {
      onClick: () => {},
      labels: {
        generateLabels: (chart) => {
          const labels = [];
          const is2GHz = chart.data.labels.find((l) => +l <= 13);
          const is5GHz = chart.data.labels.find((l) => +l > 13);

          if (is2GHz) {
            labels.push(
              { text: '2.4GHz', fillStyle: '#00B060' },
              { text: 'In use 2.4GHz', fillStyle: '#0A64A4' },
            );
          }

          if (is5GHz) {
            labels.push(
              { text: '5GHz', fillStyle: '#FF9000' },
              { text: 'In use 5GHz', fillStyle: '#FF4500' },
            );
          }

          return labels;
        },
      },
    },
    scales: {
      yAxes: [{
        ticks: { beginAtZero: true },
      }],
      xAxes: [{
        scaleLabel: { display: true, labelString: 'Channel' },
      }],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  legend = true;
  type: ChartType = 'bar';
  plugins: PluginServiceGlobalRegistrationAndOptions[] = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
  }

}
