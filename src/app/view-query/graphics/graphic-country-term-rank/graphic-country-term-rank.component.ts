import {Component, Input, OnInit} from '@angular/core';
import {Color} from '@swimlane/ngx-charts';
import {AuthService} from "../../../service-api/auth.service";
/**
 * Component for displaying a bar chart with country-term rankings using ngx-charts library.
 * It takes input data in a multi-series format and provides various customization options.
 * The chart supports features such as legends, axis labels, and color schemes.
 */
@Component({
  selector: 'app-graphic-country-term-rank',
  templateUrl: './graphic-country-term-rank.component.html',
  styleUrls: ['./graphic-country-term-rank.component.css']
})
export class GraphicCountryTermRankComponent implements OnInit {
  /**
   * Input property to provide the multi-series data for the bar chart.
   * The data should be an array of series, each containing an array of data points.
   */
  @Input() multi: any[] = [];

  /**
   * Dimensions of the chart view expressed as [width, height].
   */
  view: [number, number] = [700, 400];

  // Options for customization

  /**
   * Whether to display the X-axis on the chart.
   */
  showXAxis: boolean = true;

  /**
   * Whether to display the Y-axis on the chart.
   */
  showYAxis: boolean = true;

  /**
   * Whether to apply a gradient effect to the chart bars.
   */
  gradient: boolean = true;

  /**
   * Whether to display the legend for the chart.
   */
  showLegend: boolean = true;

  /**
   * Whether to display the X-axis label.
   */
  showXAxisLabel: boolean = true;

  /**
   * The label for the X-axis.
   */
  @Input() xAxisLabel: string = '';

  /**
   * Whether to display the Y-axis label.
   */
  showYAxisLabel: boolean = true;

  /**
   * The label for the Y-axis.
   */
  @Input() yAxisLabel: string = '';

  /**
   * The title for the legend.
   */
  @Input() legendTitle: string = '';

  /**
   * The color scheme for the chart bars.
   */
  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    selectable: true,
    name: 'coolColorScheme',
    // @ts-ignore
    group: 'myGroup'
  };

  /**
   * Constructor for the GraphicCountryTermRankComponent.
   */
  constructor() {
    // Initialize the 'multi' property with the provided input data
    Object.assign(this, { multi: this.multi });
  }

  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {
    // Perform any initialization logic here if needed
  }

  /**
   * Event handler for when a data point on the chart is selected.
   * @param data - The selected data point.
   */
  // @ts-ignore
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  /**
   * Event handler for when a data point on the chart is activated.
   * @param data - The activated data point.
   */
  // @ts-ignore
  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  /**
   * Event handler for when a data point on the chart is deactivated.
   * @param data - The deactivated data point.
   */
  // @ts-ignore
  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}

