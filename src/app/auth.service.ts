import {Injectable} from "@angular/core";
import {UserModel} from "./login/user.model";
import {HttpClient} from "@angular/common/http";
import {QueryModel} from "./my-queries/query.model";
import {CommentsModel} from "./view-query/comments.model";
import {SearchDataModel} from "./view-query/search-data.model";
import {QuerySavedModel} from "./users-queries/query-saved.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * The base URL for the API of backEnd.
   * @private
   */
  private apiUrl = 'http://localhost:8080/api';
  formDataUser: UserModel = new UserModel();
  formDataQuery: QueryModel = new QueryModel();

  constructor(private http: HttpClient) {
  }
  /**
   * Sends a POST request to create a new user.
   * @param formDataUser - The user data to be posted.
   * @returns {Observable<any>} - An observable of the HTTP response.
   */
  postUser(formDataUser: UserModel) {
    return this.http.post(`${this.apiUrl}/users`, formDataUser);
  }
  /**
   * Retrieves queries saved by username.
   * @param name - The username for querying saved queries.
   * @returns {Observable<QueryModel[]>} - An observable of the HTTP response containing saved queries.
   */
  getQueriesSavedByIdName(name: string) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/queries-save/by-username/${name}`);
  }
  /**
   * Retrieves queries by username.
   * @param name - The username for querying queries.
   * @returns {Observable<QueryModel[]>} - An observable of the HTTP response containing queries.
   */
  getQueriesByIdName(name: string) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/queries/by-username/${name}`);
  }
  /**
   * Retrieves all queries.
   * @returns {Observable<QueryModel[]>} - An observable of the HTTP response containing all queries.
   */
  getQueries() {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/queries`);
  }
  /**
   * Sends a POST request to save a query.
   * @param querySave - The query data to be saved.
   * @returns {Observable<any>} - An observable of the HTTP response.
   */
  postQuerySaved(querySave:QuerySavedModel) {
    return this.http.post(`${this.apiUrl}/queries-save/save-query`, querySave);
  }
  /**
   * Retrieves data for all search fields.
   * @param searchData - The search criteria.
   * @returns {Observable<QueryModel[]>} - An observable of the HTTP response containing query data.
   */
  getDataForAllFields(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForAllParameters?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }
  /**
   * Retrieves data for country and term search.
   * @param searchData - The search criteria.
   * @returns {Observable<QueryModel[]>} - An observable of the HTTP response containing query data.
   */
  getDataForCountryTerm(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForCountryAndTermLimit?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }
  /**
   * Retrieves data for country and date search.
   * @param searchData - The search criteria.
   * @returns {Observable<QueryModel[]>} - An observable of the HTTP response containing query data.
   */
  getDataForCountryDate(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForCountryDateLimit?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }
  /**
   * Retrieves data for country search.
   * @param searchData - The search criteria.
   * @returns {Observable<QueryModel[]>} - An observable of the HTTP response containing query data.
   */
  getDataForCountry(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForCountryLimit?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }
  /**
   * Retrieves data for date search.
   * @param searchData - The search criteria.
   * @returns {Observable<QueryModel[]>} - An observable of the HTTP response containing query data.
   */
  getDataForDate(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForDateAndLimit?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }
  /**
   * Retrieves data for term search.
   * @param searchData - The search criteria.
   * @returns {Observable<QueryModel[]>} - An observable of the HTTP response containing query data.
   */
  getDataForTerm(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForTermLimit?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }
  /**
   * Retrieves data for term and date search.
   * @param searchData - The search criteria.
   * @returns {Observable<QueryModel[]>} - An observable of the HTTP response containing query data.
   */
  getDataForTermDate(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForWeekAndTermLimit?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }
  /**
   * Retrieves a list of countries using a third-party API.
   * @returns {Observable<any>} - An observable of the HTTP response containing country data.
   */
  getCountries(){
    return this.http.get('https://restcountries.com/v3.1/all?fields=name');
  }
  /**
   * Retrieves a specific query by its ID.
   * @param idConsult - The ID of the query to be retrieved.
   * @returns {Observable<any>} - An observable of the HTTP response containing query data.
   */
  getQuery(idConsult: number) {
    return this.http.get<any>(`${this.apiUrl}/queries/${idConsult}`);
  }
  /**
   * Retrieves comments for a specific query by its ID.
   * @param idConsult - The ID of the query for which comments are to be retrieved.
   * @returns {Observable<any>} - An observable of the HTTP response containing comments data.
   */
  getComments(idConsult: any) {
    return this.http.get<any>(`${this.apiUrl}/comments/byIdQuery/${idConsult}`);
  }
  /**
   * Sends a POST request to add a comment for a specific query.
   * @param comment - The comment data to be posted.
   * @returns {Observable<any>} - An observable of the HTTP response.
   */
  postComment(comment: CommentsModel) {
    return this.http.post(`${this.apiUrl}/comments`, comment);
  }
  /**
   * Sends a POST request to create a new query.
   * @param query - The query data to be posted.
   * @returns {Observable<any>} - An observable of the HTTP response.
   */
  postQuery(query: QueryModel) {
    return this.http.post(`${this.apiUrl}/queries`, query);
  }
}
