import {
  Component,
  OnInit
} from '@angular/core';
import {AuthService} from "../auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {QueryModel} from "./query.model";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-my-queries',
  templateUrl: './my-queries.component.html',
  styleUrls: ['./my-queries.component.css']
})
export class MyQueriesComponent implements OnInit{
  /**
   * Component to display and manage user queries.
   * @property {QueryModel[]} queries - List to store user queries.
   * @property {QueryModel[]} queriesOrigin - Original list of user queries.
   * @property {number} currentPage - Current page number for pagination.
   * @property {number} elementeForPage - Number of elements to display per page.
   */
  queries: QueryModel[] = [];
  queriesOrigin: QueryModel[] = [];
  currentPage = 1;
  elementeForPage = 5;

  /**
   * Constructor for the QueryComponent.
   * @param {CookieService} cookies - Service for handling cookies.
   * @param {ToastrService} toast - Toastr service for displaying notifications.
   * @param {AuthService} authService - Service for authentication-related functionalities.
   * @param {Router} router - Angular router service.
   */
  constructor(private cookies: CookieService, private toast: ToastrService, public authService: AuthService, public router: Router) {
    this.cookies.set('idQuery', "-1");
    this.authService.formDataQuery = new QueryModel();
  }

  /**
   * Lifecycle hook called after Angular initializes the component.
   * Resets the form and initializes the component.
   */
  ngOnInit() {
    this.resetForm();
  }

  /**
   * Navigates to the view query page for the selected query.
   * @param {QueryModel} item - The selected query.
   */
  showOrder(item: QueryModel) {
    this.cookies.set('idQuery', item.id + "");
    this.router.navigate(['/viewQuery']);
  }

  /**
   * Resets the form and loads user queries.
   */
  resetForm() {
    this.authService.formDataQuery = new QueryModel();
    this.loadQueries();
  }

  /**
   * Loads user queries from the backend.
   * Displays an error toast if queries cannot be retrieved.
   */
  loadQueries() {
    this.authService.getQueriesByIdName(this.cookies.get("name")).subscribe(
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

