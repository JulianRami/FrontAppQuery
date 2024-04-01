import { Component } from '@angular/core';
import {AuthService} from "../service-api/auth.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  /**
   * Constructor for the component.
   * @param authService - An instance of the AuthService for authentication functionality.
   * @param route - An instance of the Router for navigating between components.
   * @param cookieService - An instance of the CookieService for handling cookies.
   * - Sets an initial value for the 'idQuery' cookie to "-1".
   */
  constructor(public authService: AuthService, public route: Router, public cookieService: CookieService) {
    this.cookieService.set('idQuery', "-1");
  }

  /**
   * Method to handle user exit/logout.
   * - Navigates to the "/login" route upon user exit.
   */
  exit() {
    this.route.navigate(["/login"]);
  }

}
