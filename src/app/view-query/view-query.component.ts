import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service-api/auth.service";
import {SearchDataModel} from "./search-data.model";
import {SharedGraphicRankTermService} from "./services/SharedGraphicRankTermService";
import {SharedGraphicScoreTermService} from "./services/SharedGraphicScoreTermService";
import {ToastrService} from "ngx-toastr";
import {CookieService} from "ngx-cookie-service";
import {CommentsModel} from "./comments.model";
import {QueryModel} from "../my-queries/query.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-query',
  templateUrl: './view-query.component.html',
  styleUrls: ['./view-query.component.css']
})
export class ViewQueryComponent implements OnInit{

  /**
   * Holds data for the first data set.
   */
  dataSetOne: any;

  /**
   * Holds data for the second data set.
   */
  dataSetTwo: any;

  /**
   * Holds data for the third data set.
   */
  dataSetThree: any;

  /**
   * Holds data for the fourth data set.
   */
  dataSetFour: any;

  /**
   * Represents the search term input by the user.
   */
  searchTerm: string = "";

  /**
   * Represents the selected country from a dropdown list.
   */
  selectedCountry: string = "Select a country";

  /**
   * Stores an array of available countries.
   */
  countries: any;

  /**
   * Represents the selected date from a date picker.
   */
  selectedDate: any = "";

  /**
   * Represents the selected number from a dropdown list.
   */
  selectedNumber: number = 0;

  /**
   * Generates an array of numbers from 1 to 100 for dropdown selection.
   */
  numbers: number[] = Array.from({ length: 100 }, (_, index) => index + 1);

  /**
   * Stores comments related to a specific query.
   */
  comments: any;

  /**
   * Represents the ID of the query obtained from cookies.
   */
  idQuery: number = Number.parseInt(this.cookies.get("idQuery"));

  /**
   * Represents the text content for sending a comment.
   */
  commentSend: string = "";

  /**
   * Represents the text content for saving a comment.
   */
  commentSave: string = "";

  /**
   * Represents the name of the query.
   */
  nameQuery: string = "";

  /**
   * Controls the visibility of the "Add Query" section.
   */
  showAddQuerySection: boolean = true;

  /**
   * Controls the visibility of the "Add Comment" section.
   */
  showAddCommentSection: boolean = false;

  /**
   * Constructor for the component, initializing necessary services and dependencies.
   * @param router - Angular router for navigation.
   * @param cookies - Service for handling browser cookies.
   * @param toast - ToastrService for displaying toast notifications.
   * @param authService - Service for handling authentication-related functionality.
   * @param sharedGraphicService - Service for sharing graphics-related functionality.
   * @param sharedGraphicScoreTermService - Service for sharing score-related graphics functionality.
   */
  constructor(
    private router: Router,
    private cookies: CookieService,
    private toast: ToastrService,
    private authService: AuthService,
    private sharedGraphicService: SharedGraphicRankTermService,
    private sharedGraphicScoreTermService: SharedGraphicScoreTermService
  ) {}

  /**
   * Initializes the component by configuring section visibility and loading necessary data.
   */
  ngOnInit() {
    this.showSectionsCorrectly();
    this.loadQuery();
    this.loadComments();
    this.loadListCountries();
  }

  /**
   * Controls the visibility of sections based on the existence of a query ID.
   * If a query ID is present, the comment section is shown, and the query section is hidden.
   */
  private showSectionsCorrectly(): void {
    if (this.idQuery !== -1) {
      this.showAddCommentSection = true;
      this.showAddQuerySection = false;
    }else {
      this.showAddCommentSection = false;
      this.showAddQuerySection = true;
    }
  }

  /**
   * Loads comments associated with the current query from the server.
   */
  private loadComments(): void {
    if (this.idQuery !== -1) {
      this.authService.getComments(this.idQuery).subscribe(
        (data) => {
          this.comments = data;
        },
        () => {
          console.error("Error loading comments");
        }
      );
    }
  }

  /**
   * Fetches the list of countries from the server and assigns it to the component property.
   */
  private loadListCountries(): void {
    this.authService.getCountries().subscribe(
      (data) => {
        this.countries = data;
      },
      () => {
        console.error("Error loading countries");
      }
    );
  }

  /**
   * Loads details of the current query from the server and updates component properties accordingly.
   * If a query ID is present, applies the search based on the retrieved query details.
   */
  private loadQuery(): void {
    if (this.idQuery !== -1) {
      this.authService.getQuery(this.idQuery).subscribe(
        (data) => {
          this.searchTerm = data.searchTerm;
          this.selectedCountry = data.country;
          this.selectedNumber = data.recordCount;
          this.selectedDate = this.formatDate(data.date);
          this.applySearch();
        },
        () => {
          console.error("Error loading query");
        }
      );
    }
  }

  /**
   * Formats a raw date string into the desired 'YYYY-MM-DD' format.
   * @param rawDate - The raw date string to be formatted.
   * @returns The formatted date string.
   */
  private formatDate(rawDate: string): string {
    const dateObject = new Date(rawDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  /**
   * Applies the search based on the selected criteria (country, date, and term).
   * Invokes specific methods to load data according to the selected search parameters.
   * Displays a notification if the search is not valid.
   */
  applySearch(): void {
    if (this.isValidSearch()) {
      if (this.selectedCountry !== "Select a country" && this.selectedDate == "" && this.searchTerm == "") {
        this.loadDatesForCountry();
      } else if (this.selectedCountry !== "Select a country" && this.selectedDate !== "" && this.searchTerm == "") {
        this.loadDatesForCountryDate();
      } else if (this.selectedCountry !== "Select a country" && this.searchTerm !== "" && this.selectedDate == "") {
        this.loadDatesForCountryTerm();
      } else if (this.selectedDate !== "" && this.searchTerm == "" && this.selectedCountry == "Select a country") {
        this.loadDatesForDate();
      } else if (this.searchTerm !== "" && this.selectedDate == "" && this.selectedCountry == "Select a country") {
        this.loadDatesForTerm();
      } else if (this.selectedDate !== "" && this.searchTerm !== "" && this.selectedCountry == "Select a country") {
        this.loadDatesForDateTerm();
      } else {
        this.loadDatesForAllFields();
      }
    } else {
      this.toast.info("Please enter a record number", "Number of records");
    }
  }

  /**
   * Loads data for the combination of term and date from the server.
   * @private
   */
  private loadDatesForDateTerm(): void {
    const searchData = this.createSearchData();
    this.authService.getDataForTermDate(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        if (error.error instanceof ErrorEvent) {
          this.toast.error('An error occurred:', 'Query not created');
        } else {
          this.toast.error(error.error.message, 'Query not created');
          console.error(`Error status: ${error.status}, error message: ${error.error.message}`);
        }
      }
    );
  }

  /**
   * Loads data for the selected term from the server.
   * @private
   */
  private loadDatesForTerm(): void {
    const searchData = this.createSearchData();
    this.authService.getDataForTerm(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        if (error.error instanceof ErrorEvent) {
          this.toast.error('An error occurred:', 'Query not created');
        } else {
          this.toast.error(error.error.message, 'Query not created');
          console.error(`Error status: ${error.status}, error message: ${error.error.message}`);
        }
      }
    );
  }

  /**
   * Loads data for the selected date from the server.
   * @private
   */
  private loadDatesForDate(): void {
    const searchData = this.createSearchData();
    this.authService.getDataForDate(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        if (error.error instanceof ErrorEvent) {
          this.toast.error('An error occurred:', 'Query not created');
        } else {
          this.toast.error(error.error.message, 'Query not created');
          console.error(`Error status: ${error.status}, error message: ${error.error.message}`);
        }
      }
    );
  }

  /**
   * Loads data for the selected country from the server.
   * @private
   */
  private loadDatesForCountry(): void {
    const searchData = this.createSearchData();
    this.authService.getDataForCountry(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        if (error.error instanceof ErrorEvent) {
          this.toast.error('An error occurred:', 'Query not created');
        } else {
          this.toast.error(error.error.message, 'Query not created');
          console.error(`Error status: ${error.status}, error message: ${error.error.message}`);
        }
      }
    );
  }

  /**
   * Loads data for the combination of country and date from the server.
   * @private
   */
  private loadDatesForCountryDate(): void {
    const searchData = this.createSearchData();
    this.authService.getDataForCountryDate(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        if (error.error instanceof ErrorEvent) {
          this.toast.error('An error occurred:', 'Query not created');
        } else {
          this.toast.error(error.error.message, 'Query not created');
          console.error(`Error status: ${error.status}, error message: ${error.error.message}`);
        }
      }
    );
  }

  /**
   * Loads data for the combination of country and term from the server.
   * @private
   */
  private loadDatesForCountryTerm(): void {
    const searchData = this.createSearchData();
    this.authService.getDataForCountryTerm(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        if (error.error instanceof ErrorEvent) {
          this.toast.error('An error occurred:', 'Query not created');
        } else {
          this.toast.error(error.error.message, 'Query not created');
          console.error(`Error status: ${error.status}, error message: ${error.error.message}`);
        }
      }
    );
  }
  /**
   * Loads data for all selected fields from the server based on the search criteria.
   * Invokes the necessary transformations and updates the corresponding components with the loaded data.
   */
  loadDatesForAllFields(): void {
    const searchData = this.createSearchData();
    this.authService.getDataForAllFields(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        if (error.error instanceof ErrorEvent) {
          this.toast.error('An error occurred:', 'Query not created');
        } else {
          this.toast.error(error.error.message, 'Query not created');
          console.error(`Error status: ${error.status}, error message: ${error.error.message}`);
        }
      }
    );
  }

  /**
   * Creates a SearchDataModel object with the current selected search parameters.
   * @returns A SearchDataModel object containing search criteria.
   * @private
   */
  private createSearchData(): SearchDataModel {
    return {
      date: this.selectedDate,
      country: this.selectedCountry,
      limit: this.selectedNumber,
      term: this.searchTerm
    };
  }

  /**
   * Transforms the raw data into a format suitable for loading into components.
   * Loads the transformed data into the corresponding components.
   * @param response - Raw data from the server.
   * @private
   */
  private transformAndLoadData(response: any[]): void {
    const scoreData = this.transformData(response, 'score');
    this.sharedGraphicScoreTermService.loadDatesForAllFields(scoreData);
    const rankingData = this.transformData(response, 'ranking');
    this.sharedGraphicService.loadDatesForAllFields(rankingData);
    this.dataSetOne = this.transformAndLoadDataSet(response, 'country', 'ranking');
    this.dataSetTwo = this.transformAndLoadDataSet(response, 'country', 'score');
    this.dataSetThree = this.transformAndLoadDataSet(response, 'date', 'ranking');
    this.dataSetFour = this.transformAndLoadDataSet(response, 'date', 'score');
  }

  /**
   * Transforms raw data into a format suitable for loading into components.
   * @param response - Raw data from the server.
   * @param valueType - Type of value to extract from the data.
   * @returns Transformed data.
   * @private
   */
  private transformData(response: any[], valueType: string): any[] {
    return response.map(item => ({
      name: item.searchTerm,
      value: item[valueType]
    }));
  }

  /**
   * Transforms and loads dataset based on keyStart and keyEnd.
   * @param response - Raw data from the server.
   * @param keyStart - Starting key for data extraction.
   * @param keyEnd - Ending key for data extraction.
   * @returns Transformed dataset.
   * @private
   */
  private transformAndLoadDataSet(response: any[], keyStart: string, keyEnd: string): any {
    let dataSet = response.map(item => ({
      name: item.searchTerm,
      series: Object.keys(item)
        .filter(key => key.startsWith(keyStart) && key in item && key.replace(keyStart, keyEnd) in item)
        .map(key => ({
          name: item[key],
          value: item[key.replace(keyStart, keyEnd)],
        })),
    }));
    return dataSet;
  }

  /**
   * Checks if the current search is valid.
   * @returns True if the search is valid, false otherwise.
   * @private
   */
  private isValidSearch(): boolean {
    return this.selectedNumber !== 0 && (this.searchTerm !== undefined || this.selectedDate !== "" || this.selectedCountry !== "Select a country");
  }

  /**
   * Adds a comment to the current query.
   * Displays success or error messages based on the result.
   */
  addComment(): void {
    if (this.commentSend !== "") {
      const comment: CommentsModel = new CommentsModel();
      comment.commentText = this.commentSend;
      comment.queryId = Number.parseInt(this.cookies.get("idQuery"));
      comment.user = this.cookies.get("name");
      this.authService.postComment(comment).subscribe(
        () => {
          this.toast.success("Comment Added Successfully", "Comment added");
          this.commentSend = "";
          this.loadComments();
        },
        () => {
          this.toast.info("Couldn't add comment", "Comment not added");
        }
      );
    } else {
      this.toast.info("Please enter a comment", "Enter Comment");
    }
  }

  /**
   * Saves the current query with the provided information.
   * Displays success or error messages based on the result.
   */
  saveQuery(): void {
    if(this.validateFormSaved()) {
      if(this.validateFormDates()) {
        const query: QueryModel = new QueryModel();
        query.queryName = this.nameQuery;
        const selectedDate = new Date(this.selectedDate);
        selectedDate.setDate(selectedDate.getDate() + 1);
        query.date = selectedDate;
        query.description = this.commentSave;
        query.searchTerm = this.searchTerm;
        query.country = this.selectedCountry;
        query.recordCount = this.selectedNumber;
        query.user = this.cookies.get("name");
        this.authService.postQuery(query).subscribe(
          () => {
            this.toast.success("Query Added Successfully", "Query added");
            this.cookies.set('idQuery', "-1");
            this.resetComponent();
            this.ngOnInit();
          },
          () => {
            this.toast.error("Couldn't add query", "Query not added");
          }
        );
      }
    }
  }

  /**
   * Validates the form for saving queries.
   * Checks if the query name and description are filled.
   *
   * @returns {boolean} True if validation is successful, false otherwise.
   */
  private validateFormSaved(): boolean {
    if (!this.nameQuery || !this.commentSave) {
      this.toast.warning("Please fill in query name and description", "Validation Error");
      return false;
    }
    return true;
  }

  /**
   * Validates the form for date-based queries.
   * Checks if the search term, selected country, and selected number are provided.
   *
   * @returns {boolean} True if validation is successful, false otherwise.
   */
  private validateFormDates(): boolean {
    if (!this.searchTerm || !this.selectedCountry || !this.selectedNumber) {
      this.toast.warning("Please make a query", "Validation Error");
      return false;
    }
    return true;
  }

  /**
   * Resets the component to its initial state.
   * Clears input fields and resets datasets.
   */
  resetComponent(): void {
    this.selectedNumber = 0;
    this.searchTerm = '';
    this.selectedDate = "";
    this.selectedCountry = '';
    this.dataSetFour = [];
    this.dataSetThree = [];
    this.dataSetTwo = [];
    this.dataSetOne = [];
    this.nameQuery = "";
    this.commentSave = "";
    this.sharedGraphicScoreTermService.loadDatesForAllFields([]);
    this.sharedGraphicService.loadDatesForAllFields([]);
  }

}
