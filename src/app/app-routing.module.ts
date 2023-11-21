import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {MyQueriesComponent} from "./my-queries/my-queries.component";
/*import {SavedQueriesComponent} from "./saved-queries/saved-queries.component";
import {UsersQueriesComponent} from "./users-queries/users-queries.component";
import {ViewQueryComponent} from "./view-query/view-query.component";*/

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "homePage", component: HomePageComponent},
  { path: "myQueries", component: MyQueriesComponent},
 /* { path: "savedQueries", component: SavedQueriesComponent},
  { path: "queriesOtherUsers", component: UsersQueriesComponent},
  { path: "viewQuery", component: ViewQueryComponent}*/
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes , { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
