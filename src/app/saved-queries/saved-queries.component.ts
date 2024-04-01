import {
  Component,
  OnInit
} from '@angular/core';
import {AuthService} from "../service-api/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {QueryModel} from "../my-queries/query.model";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-saved-queries',
  templateUrl: './saved-queries.component.html',
  styleUrls: ['./saved-queries.component.css']
})
  /**
   * Component class representing the management of user queries.
   * @property {QueryModel[]} queries - Array to store the user's saved queries.
   * @property {QueryModel[]} queriesOrigin - Original array of user queries before any filtering.
   * @property {number} currentPage - Current page number for paginating the displayed queries.
   * @property {number} elementeForPage - Number of elements to display per page.
   * @property {any[]} comments - Array to store comments associated with the queries.
   */
  export class SavedQueriesComponent implements OnInit{
  queries: QueryModel[] = [];
  queriesOrigin: QueryModel[] = [];
  currentPage = 1;
  elementeForPage = 5;
  comments: any = [];

  /**
   * Constructor for QueryManagementComponent.
   * @param {CookieService} cookies - Service for handling cookies.
   * @param {ToastrService} toast - Service for displaying toast notifications.
   * @param {AuthService} authService - Service for handling authentication-related functionality.
   * @param {Router} router - Angular router service for navigation.
   */
  constructor(private cookies: CookieService, private toast: ToastrService, public authService: AuthService, public router: Router) {
    this.cookies.set('idQuery', "-1");
    this.authService.formDataQuery = new QueryModel();
  }

  /**
   * Lifecycle hook called after Angular initializes the component.
   * Calls the resetForm method to initialize and load user queries.
   */
  ngOnInit() {
    this.resetForm();
  }

  /**
   * Navigates to the detailed view of a specific query.
   * @param {QueryModel} item - The query item to display in detail.
   */
  showQuery(item: QueryModel) {
    this.cookies.set('idQuery', item.id + "");
    this.router.navigate(['/viewQuery']);
  }
  /**
   * Resets the form and loads the user's saved queries.
   * Calls the private method loadQueries to fetch and update the query data.
   */
  resetForm() {
    this.authService.formDataQuery = new QueryModel();
    this.loadQueries();
  }

  /**
   * Private method to fetch and update the user's saved queries.
   * Handles the HTTP request to get queries by user name and updates the queries arrays accordingly.
   */
  private loadQueries() {
    this.authService.getQueriesSavedByIdName(this.cookies.get("name")).subscribe(
      (data) => {
        this.queries = data;
        this.queriesOrigin = data;
      },
      () => {
        this.toast.error("Could not find queries", "Search Error");
      }
    );
  }

}

