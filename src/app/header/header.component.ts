import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  /**
   * Constructor of the class.
   *
   * @param route - The Angular Router service used for navigation.
   * @param cookieService - The Angular CookieService used for managing cookies.
   */
  constructor( public route:Router, public cookieService: CookieService) {
  }
  /**
   * Navigates to the login page and removes the 'name' cookie, effectively logging the user out.
   */
  exit() {
    this.route.navigate(["/login"]);
    this.cookieService.delete('name');
  }
}
