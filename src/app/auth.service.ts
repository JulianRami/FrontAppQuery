import {Injectable} from "@angular/core";
import {UserModel} from "./login/user.model";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {QueryModel} from "./my-queries/query.model";
import {CommentsModel} from "./view-query/comments.model";
import {SearchDataModel} from "./view-query/search-data.model";
import {QuerySavedModel} from "./users-queries/query-saved.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api';
  formDataUser: UserModel = new UserModel();
  formDataQuery: QueryModel = new QueryModel();

  constructor(private http: HttpClient, public cookiesService: CookieService) {
  }

  postUser(formDataUser: UserModel) {
    return this.http.post(`${this.apiUrl}/users`, formDataUser);
  }

  getQueriesSavedByIdName(name: string) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/queries-save/by-username/${name}`);
  }

  getQueriesByIdName(name: string) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/queries/by-username/${name}`);
  }

  getQueries() {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/queries`);
  }

  postQuerySaved(querySave:QuerySavedModel) {
    return this.http.post(`${this.apiUrl}/queries-save/save-query`, querySave);
  }


  getDataForAllFields(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForAllParameters?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }

  getDataForCountryTerm(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForCountryAndTermLimit?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }

  getDataForCountryDate(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForCountryDateLimit?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }

  getDataForCountry(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForCountryLimit?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }

  getDataForDate(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForDateAndLimit?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }

  getDataForTerm(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForTermLimit?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }

  getDataForTermDate(searchData: SearchDataModel) {
    return this.http.get<QueryModel[]>(`${this.apiUrl}/search-query-controller/queryForWeekAndTermLimit?country=${searchData.country}&date=${searchData.date}&term=${searchData.term}&limit=${searchData.limit}`);
  }

  getCountries(){
    return this.http.get('https://restcountries.com/v3.1/all?fields=name');
  }

  getQuery(idConsult: number) {
    return this.http.get<any>(`${this.apiUrl}/queries/${idConsult}`);
  }

  getComments(idConsult: any) {
    return this.http.get<any>(`${this.apiUrl}/comments/byIdQuery/${idConsult}`);
  }

  postComment(comment: CommentsModel) {
    return this.http.post(`${this.apiUrl}/comments`, comment);
  }

  postQuery(query: QueryModel) {
    return this.http.post(`${this.apiUrl}/queries`, query);
  }
}
