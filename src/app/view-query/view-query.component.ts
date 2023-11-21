import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
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

  ngOnInit() {
    this.showSecctionsCorrects();
    this.loadQuery();
    this.loadComments();
    this.loadListCountries();
  }

  private showSecctionsCorrects(){
    if (this.idQuery !== -1) {
      this.showAddCommentSection = true;
      this.showAddQuerySection = false;
    }
  }

  private loadComments() {
    if (this.idQuery !== -1) {
      this.authService.getComments(this.idQuery).subscribe((data) => {
          this.comments = data;
        },
        () => {
          console.log("Error cargando comments");
        }
      );
    }
  }

  private loadListCountries(){
    this.authService.getCountries().subscribe((data)=>{
        this.countries = data;
      },
      ()=>{
        console.log("Error cargando paises");
      }
    );
}

  private loadQuery(){
    if (this.idQuery !== -1) {
      this.authService.getQuery(this.idQuery).subscribe((data) => {
          this.searchTerm = data.searchTerm;
          this.selectedCountry = data.country;
          this.selectedNumber = data.recordCount;
          this.selectedDate = this.formatDate(data.date);
          this.applySearch();
        },
        () => {
          console.log("Error cargando consulta");
        }
      );
    }
  }

  private formatDate(rawDate: string): string {
    const dateObject = new Date(rawDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Ajusta el mes a dos dígitos
    const day = dateObject.getDate().toString().padStart(2, '0'); // Ajusta el día a dos dígitos
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  applySearch() {
    if(this.isValidSearch()){
      if(this.selectedCountry !== "Select a country" && this.selectedDate == "" && this.searchTerm == ""){
        this.loadDatesForCountry();
      }else if(this.selectedCountry !== "Select a country" && this.selectedDate !== "" && this.searchTerm == ""){
        this.loadDatesForCountryDate();
      }else if(this.selectedCountry !== "Select a country" && this.searchTerm !== "" && this.selectedDate == ""){
        this.loadDatesForCountryTerm();
      }else if(this.selectedDate !== "" && this.searchTerm == "" && this.selectedCountry == "Select a country"){
        this.loadDatesForDate();
      }else if(this.searchTerm !== "" && this.selectedDate == "" && this.selectedCountry == "Select a country"){
        this.loadDatesForTerm();
      }else if(this.selectedDate !== "" && this.searchTerm !== "" && this.selectedCountry == "Select a country"){
        this.loadDatesForDateTerm();
      }else{
        this.loadDatesForAllFields();
      }
    }else{
      this.toast.info("Please enter a record number","Number of records");
    }
  }

  private loadDatesForDateTerm() {
    const searchData = this.createSearchData();
    this.authService.getDataForTermDate(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        console.error('Error al cargar datos:', error);
      }
    );
  }

  private loadDatesForTerm() {
    const searchData = this.createSearchData();
    this.authService.getDataForTerm(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        console.error('Error al cargar datos:', error);
      }
    );
  }

  private loadDatesForDate() {
    const searchData = this.createSearchData();
    this.authService.getDataForDate(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        console.error('Error al cargar datos:', error);
      }
    );
  }

  private loadDatesForCountry() {
    const searchData = this.createSearchData();
    this.authService.getDataForCountry(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        console.error('Error al cargar datos:', error);
      }
    );
  }

  private loadDatesForCountryDate() {
    const searchData = this.createSearchData();
    this.authService.getDataForCountryDate(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        console.error('Error al cargar datos:', error);
      }
    );
  }

  private loadDatesForCountryTerm() {
    const searchData = this.createSearchData();
    this.authService.getDataForCountryTerm(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        console.error('Error al cargar datos:', error);
      }
    );
  }

  loadDatesForAllFields() {
    const searchData = this.createSearchData();
    this.authService.getDataForAllFields(searchData).subscribe(
      (response: any[]) => {
        this.transformAndLoadData(response);
      },
      (error) => {
        console.error('Error al cargar datos:', error);
      }
    );
  }

  private createSearchData(): SearchDataModel {
    return {
      date: this.selectedDate,
      country: this.selectedCountry,
      limit: this.selectedNumber,
      term: this.searchTerm
    };
  }

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

  private transformData(response: any[], valueType: string): any[] {
    return response.map(item => ({
      name: item.searchTerm,
      value: item[valueType]
    }));
  }

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

  private isValidSearch(){
    if(this.selectedNumber !== 0 && (this.searchTerm !== undefined || this.selectedDate !== ""
      || this.selectedCountry !== "Select a country")){
      return true;
    }
    return false;
  }

  addComment() {
    if(this.commentSend !== ""){
      const comment: CommentsModel = new CommentsModel();
      comment.commentText = this.commentSend;
      comment.queryId = Number.parseInt(this.cookies.get("idQuery"));
      comment.user = this.cookies.get("name");
      this.authService.postComment(comment).subscribe(()=>{
          this.toast.success("Comment Added Successfully","Comment added");
          this.commentSend = "";
          this.loadComments();
        },
        ()=>{
          this.toast.info("Couldn't add comment","Comment not added");
        }
      );
    }else {
      this.toast.info("Please enter a comment","Enter Comment");
    }
  }

  saveQuery() {
    const query:QueryModel = new QueryModel();
    query.queryName = this.nameQuery;
    const selectedDate = new Date(this.selectedDate);
    selectedDate.setDate(selectedDate.getDate() + 1);
    query.date = selectedDate;
    query.description = this.commentSave;
    query.searchTerm = this.searchTerm;
    query.country = this.selectedCountry;
    query.recordCount = this.selectedNumber;
    query.user = this.cookies.get("name");
    this.authService.postQuery(query).subscribe(()=>{
        this.toast.success("Query Added Successfully","Query added");
        this.cookies.set('idQuery', "-1");
        this.resetComponent();
        this.ngOnInit();
      },
      ()=>{
        this.toast.error("Couldn't add query","Query not added");
      }
    );

  }

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
    this.sharedGraphicScoreTermService.loadDatesForAllFields([])
    this.sharedGraphicService.loadDatesForAllFields([]);
  }
}
