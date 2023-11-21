import { Injectable } from '@angular/core';
import {GraphicRankTermComponent} from "../graphics/graphic-rank-term/graphic-rank-term.component";

/**
 * Service for sharing and managing communication between components related to term ranking graphics.
 * This service is specifically designed to work with the GraphicRankTermComponent.
 */
@Injectable({
  providedIn: 'root',
})
export class SharedGraphicRankTermService {
  /**
   * Private property within the SharedGraphicRankTermService class.
   * This property holds an instance of the GraphicRankTermComponent for communication purposes.
   * It is set using the setGraphicRankTermComponent method and accessed internally within the service.
   */
  // @ts-ignore
  private graphicRankTermComponent: GraphicRankTermComponent;
  /**
   * Sets the GraphicRankTermComponent instance to enable communication with it.
   * @param component - An instance of GraphicRankTermComponent to be set.
   */
  setGraphicRankTermComponent(component: GraphicRankTermComponent): void {
    this.graphicRankTermComponent = component;
  }
  /**
   * Loads date information into the GraphicRankTermComponent if it is set.
   * If the component is not set, an error is logged to the console.
   * @param dates - Array of data points representing term rankings.
   */
  loadDatesForAllFields(dates: any[]): void {
    if (this.graphicRankTermComponent) {
      this.graphicRankTermComponent.loadDates(dates);
    } else {
      console.error('GraphicRankTermComponent is not set.');
    }
  }
}
