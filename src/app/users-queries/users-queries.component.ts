import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {AuthService} from "../service-api/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {QueryModel} from "../my-queries/query.model";
import {CookieService} from "ngx-cookie-service";
import {QuerySavedModel} from "./query-saved.model";
import {catchError, map, Observable, of} from "rxjs";


@Component({
  selector: 'app-users-queries',
  templateUrl: './users-queries.component.html',
  styleUrls: ['./users-queries.component.css']
})
export class UsersQueriesComponent implements OnInit{
  @Input() cartStyles: any;
  queries: QueryModel[] = [];
  queriesOrigin: QueryModel[] = [];
  currentPage = 1;
  elementeForPage = 5;
  constructor(private cookies:CookieService, private toast: ToastrService, public authService: AuthService, public router: Router)  {
    this.cookies.set('idQuery', "-1");
    this.authService.formDataQuery = new QueryModel();
  }
  ngOnInit() {
    this.resetForm();
  }

  showQuery(item: QueryModel){
    this.cookies.set('idQuery', item.id+"");
    this.router.navigate(['/viewQuery']);
  }

  resetForm() {
    this.authService.formDataQuery = new QueryModel();
    this.authService.getQueries().subscribe(
      (data) => {
        this.queries = data;
        this.queriesOrigin = data;
      },
      () => {
        this.toast.error("Could not find queries", "Search Error");
      }
    );
  }
  // Metodo para guardar la consulta de otro usuario
  saveQuery(item: QueryModel) {
    this.isSaved(item).subscribe(
      (isSaved) => {
        if (!isSaved) {
          let querySaved: QuerySavedModel = new QuerySavedModel();
          querySaved.idQuery = item.id;
          querySaved.user = this.cookies.get("name");
          this.authService.postQuerySaved(querySaved).subscribe(
            () => {
              this.toast.success("The query was saved correctly","Query saved successfully");
            },
            (error) => {
              this.toast.error("Error saving query", "Saving error");
            }
          );
        } else {
          this.toast.info("The query is already saved", "Query already saved");
        }
      },
      () => {
        this.toast.error("Could not verify saved queries", "Verification Error");
      }
    );
  }

// Función para verificar si el objeto ya está guardado
  isSaved(item: QueryModel): Observable<boolean> {
    return this.authService.getQueriesSavedByIdName(this.cookies.get("name")).pipe(
      map((queriesUser) => {
        return queriesUser.some((query) => query.id === item.id);
      }),
      catchError(() => {
        this.toast.error("Could not find queries", "Search Error");
        return of(false);
      })
    );
  }


}

