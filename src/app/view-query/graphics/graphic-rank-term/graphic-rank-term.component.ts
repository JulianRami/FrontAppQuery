import {Component, OnInit} from '@angular/core';
import {Color} from '@swimlane/ngx-charts';
import {AuthService} from "../../../service-api/auth.service";
import {SharedGraphicRankTermService} from "../../services/SharedGraphicRankTermService";
/**
 * Component for displaying a horizontal bar chart with term rankings using ngx-charts library.
 * It takes input data in a single-series format and provides various customization options.
 * The chart supports features such as legends, axis labels, and color schemes.
 */
@Component({
  selector: 'app-graphic-rank-term',
  templateUrl: './graphic-rank-term.component.html',
  styleUrls: ['./graphic-rank-term.component.css']
})
export class GraphicRankTermComponent implements OnInit {
  /**
   * Input property to provide the single-series data for the horizontal bar chart.
   * The data should be an array of data points representing term rankings.
   */
  single: any[] = [];

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
  gradient: boolean = false;

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
  xAxisLabel: string = 'Rank';

  /**
   * Whether to display the Y-axis label.
   */
  showYAxisLabel: boolean = true;

  /**
   * The label for the Y-axis.
   */
  yAxisLabel: string = 'Term';

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
   * Constructor for the GraphicRankTermComponent.
   * @param sharedGraphicService - An instance of SharedGraphicRankTermService for communication with other components.
   */
  constructor(private sharedGraphicService: SharedGraphicRankTermService) {
    // Initialize the 'single' property with the provided input data
    Object.assign(this, { single: this.single });
  }

  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {
    // Set this component in the shared service for communication
    this.sharedGraphicService.setGraphicRankTermComponent(this);
  }

  /**
   * Method to load date information into the chart.
   * @param dates - Array of data points representing term rankings.
   */
  loadDates(dates: any) {
    this.single = dates;
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

