import { Component } from '@angular/core';
import { AuthService } from '../service-api/auth.service';
import { Router} from "@angular/router";
import {UserModel} from "./user.model";
import {ToastrService} from "ngx-toastr";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /**
   * Variable 'username' that saves the username of the user.
   */
  username: string;

  /**
   * Constructor of the class.
   * @param cookieService - Service for handling cookies.
   * @param authService - Authentication service for user-related operations.
   * @param route - Router for navigating between components.
   * @param toast - Toastr service for displaying toast notifications.
   */
  constructor(public cookieService: CookieService, public authService: AuthService, private route: Router, private toast: ToastrService) {
    this.username = "";
  }

  /**
   * This method is triggered when the user submits a form to create a new user. It performs the following tasks:
   * 1. Checks if the username field is filled out.
   * 2. If the username is empty, displays an information toast notifying the user to fill out the field.
   * 3. If the username is provided, makes a POST request to create a new user using the authentication service.
   * 4. Handles the response from the server:
   *    - If successful, displays a success toast, sets cookies, navigates to the home page, and resets the user form data.
   *    - If there's an error, checks if it's a client-side error and displays a generic error toast.
   *      If it's a server-side error, displays the error message from the server along with the status code in a toast
   *      and logs the details to the console.
   */
  onSubmit() {
    if (!this.authService.formDataUser.username) {
      this.toast.info("Please fill out the field", "Incomplete Form");
    } else {
      this.authService.postUser(this.authService.formDataUser).subscribe(
        (response: any) => {
          this.toast.success('The name has been successfully saved', 'Successful login');
          this.cookieService.set('name', this.authService.formDataUser.username);
          this.cookieService.set('idQuery', "-1");
          this.route.navigate(['/homePage']);
          this.authService.formDataUser = new UserModel();
        },
        (error) => {
          if (error.error instanceof ErrorEvent) {
            this.toast.error('An error occurred:', 'User not created');
          } else {
            this.toast.error(error.error.message, 'User not created');
            console.error(`Error status: ${error.status}, error message: ${error.error.message}`);
          }
        }
      );
    }
  }


}

