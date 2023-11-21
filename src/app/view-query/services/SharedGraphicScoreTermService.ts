import { Injectable } from '@angular/core';
import {GraphicScoreTermComponent} from "../graphics/graphic-score-term/graphic-score-term.component";

/**
 * Service for sharing and managing communication between components related to term score graphics.
 * This service is specifically designed to work with the GraphicScoreTermComponent.
 */
@Injectable({
  providedIn: 'root',
})
export class SharedGraphicScoreTermService {
  /**
   * Private property within the SharedGraphicScoreTermService class.
   * This property holds an instance of the GraphicScoreTermComponent for communication purposes.
   * It is set using the setGraphicRankTermComponent method and accessed internally within the service.
   */
    // @ts-ignore
    private graphicScoreTermComponent: GraphicScoreTermComponent;

  /**
   * Sets the GraphicScoreTermComponent instance to enable communication with it.
   * @param component - An instance of GraphicScoreTermComponent to be set.
   */
  setGraphicRankTermComponent(component: GraphicScoreTermComponent): void {
    this.graphicScoreTermComponent = component;
  }

  /**
   * Loads date information into the GraphicScoreTermComponent if it is set.
   * If the component is not set, an error is logged to the console.
   * @param dates - Array of data points representing term scores.
   */
  loadDatesForAllFields(dates: any[]): void {
    if (this.graphicScoreTermComponent) {
      this.graphicScoreTermComponent.loadDates(dates);
    } else {
      console.error('GraphicScoreTermComponent is not set.');
    }
  }
}
