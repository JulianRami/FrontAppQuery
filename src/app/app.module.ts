import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { MyQueriesComponent } from './my-queries/my-queries.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";
import {NgApexchartsModule} from "ng-apexcharts";
import { SavedQueriesComponent } from './saved-queries/saved-queries.component';
import { UsersQueriesComponent } from './users-queries/users-queries.component';
import { ViewQueryComponent } from './view-query/view-query.component';
import { GraphicCountryTermRankComponent } from './view-query/graphics/graphic-country-term-rank/graphic-country-term-rank.component';
import { GraphicRankTermComponent } from './view-query/graphics/graphic-rank-term/graphic-rank-term.component';
import { GraphicScoreTermComponent } from './view-query/graphics/graphic-score-term/graphic-score-term.component';
import {BarChartModule} from "@swimlane/ngx-charts";
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    LoginComponent,
    MyQueriesComponent,
    SavedQueriesComponent,
    UsersQueriesComponent,
    ViewQueryComponent,
    GraphicCountryTermRankComponent,
    GraphicRankTermComponent,
    GraphicScoreTermComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    BarChartModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
