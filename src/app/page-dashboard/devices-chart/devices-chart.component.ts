import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { DataModel } from '../page-dashboard.component';

interface ChartClickEvent {
  event?: MouseEvent;
  active?: {}[];
}

interface ActiveObject {
  _model: {
    label: string;
  };
}

@Component({
  selector: 'app-devices-chart',
  templateUrl: './devices-chart.component.html',
  styleUrls: ['./devices-chart.component.scss'],
})
export class DevicesChartComponent implements OnInit {
  models: DataModel[] = [];

  @Input('models') set inputModels(models: DataModel[]) {
    this.models = models;

    const labels = [];
    const counts = [];

    for (const model of models) {
      labels.push(model.model);
      counts.push(model.count);
    }

    this.chartLabels = labels;
    this.chartCounts = counts;
  }

  @Output() selectDevice = new EventEmitter<string>();

  chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => ctx.chart.data.labels[ctx.dataIndex],
      },
    },
  };
  chartLegend = true;
  chartType: ChartType = 'pie';
  chartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [];
  chartLabels: Label[] = [];
  chartCounts: number[] = [];
  chartColors = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
  }

  handleClick({ event, active }: ChartClickEvent): void {
    if (!active.length) {
      return;
    }

    const label = (active[0] as ActiveObject)._model.label;
    this.selectDevice.emit(label);
  }
}
