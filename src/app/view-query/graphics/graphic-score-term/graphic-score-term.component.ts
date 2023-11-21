import {Component, OnInit} from '@angular/core';
import {Color} from '@swimlane/ngx-charts';
import {AuthService} from "../../../auth.service";
import {SharedGraphicScoreTermService} from "../../services/SharedGraphicScoreTermService";

/**
 * Component for displaying a vertical bar chart with term scores using ngx-charts library.
 * It takes input data in a single-series format and provides various customization options.
 * The chart supports features such as legends, axis labels, and color schemes.
 */
@Component({
  selector: 'app-graphic-score-term',
  templateUrl: './graphic-score-term.component.html',
  styleUrls: ['./graphic-score-term.component.css']
})
export class GraphicScoreTermComponent implements OnInit {
  /**
   * Input property to provide the single-series data for the vertical bar chart.
   * The data should be an array of data points representing term scores.
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
  showXAxis = true;

  /**
   * Whether to display the Y-axis on the chart.
   */
  showYAxis = true;

  /**
   * Whether to apply a gradient effect to the chart bars.
   */
  gradient = false;

  /**
   * Whether to display the legend for the chart.
   */
  showLegend = true;

  /**
   * Whether to display the X-axis label.
   */
  showXAxisLabel = true;

  /**
   * The label for the X-axis.
   */
  xAxisLabel = 'Term';

  /**
   * Whether to display the Y-axis label.
   */
  showYAxisLabel = true;

  /**
   * The label for the Y-axis.
   */
  yAxisLabel = 'Score';


  /**
   * The color scheme for the chart bars.
   */
  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    selectable: true,
    name: 'coolColorScheme',
    // @ts-ignore
    group: 'myGroup' // Adjust according to your needs
  };

  /**
   * Constructor for the GraphicScoreTermComponent.
   * @param authService - An instance of the AuthService for user authentication.
   * @param sharedGraphicService - An instance of SharedGraphicScoreTermService for communication with other components.
   */
  constructor(private authService: AuthService, private sharedGraphicService: SharedGraphicScoreTermService) {
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
   * Method to load score information into the chart.
   * @param scores - Array of data points representing term scores.
   */
  loadDates(scores: any[]) {
    this.single = scores;
  }

  /**
   * Event handler for when a data point on the chart is selected.
   * @param event - The selected data point.
   */
  // @ts-ignore
  onSelect(event) {
    console.log(event);
  }
}
