import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { FailureModule } from './failure/failure.module';
import { PlannedMaintenanceModule } from './planned-maintenance/planned-maintenance.moule';
import { ArchivedFailureModule } from './archived-failure/archived-failure.module';
import { ArchivedPlannedMaintenanceModule } from './archived-planned-maintenance/archived-planned-maintenance.moule';
import { BroadbandComponent } from './sub-navigation/broadband-component/broadband.component';
import { FixedComponent } from './sub-navigation/fixed-component/fixed-component';
import { MobileComponent } from './sub-navigation/mobile-component/mobile-component';
import { ServiceguardComponent } from './sub-navigation/serviceguard-component/serviceguard.component';
import { OtherComponent } from './sub-navigation/other-component/other-component';
import { DatePipe } from '@angular/common';
import { Ng2PaginationModule } from 'ng2-pagination';
import { Ng2DatetimePickerModule, Ng2Datetime } from 'ng2-datetime-picker';

import {
  ApiService, DateFormatorSerice, CustomNgbDateParserFormatter, CustomNgbDateParserFormatterFactory
} from './_helpers/index';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { AuthGuard } from './_guards/index';
import {
  AuthenticationService,
  UserService,
  FailureService,
  HomeService,
  ApplicationUtillService,
  FailureOverviewService
} from './_services/index';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { MainPipe } from './main-pipe.module';
import { Broadcaster } from './commons/application-broadcaster.service';
import { MessageEvent } from './commons/message-event';

import {
  FooterComponent,
  HeaderComponent,
  Errors,
  FailureOverviewComponent
} from './shared';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BroadbandComponent,
    FixedComponent,
    MobileComponent,
    ServiceguardComponent,
    OtherComponent,
    LoginComponent,
    HomeComponent,
    FailureOverviewComponent
  ],
  imports: [
    BrowserModule,
    Angular2FontawesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FailureModule,
    PlannedMaintenanceModule,
    ArchivedFailureModule,
    ArchivedPlannedMaintenanceModule,
    routing,
    MainPipe,
    NgbModule.forRoot(),
    Ng2PaginationModule,
    Ng2DatetimePickerModule
  ],
  providers: [
    // Service providers used
    AuthGuard,
    UserService,
    AuthenticationService,
    FailureService,
    HomeService,
    ApplicationUtillService,
    DateFormatorSerice,
    { provide: NgbDateParserFormatter, useFactory: CustomNgbDateParserFormatterFactory },
    FailureOverviewService,
    Broadcaster,
    MessageEvent,
    // Model providers
    Errors,
    ApiService,
    MockBackend,
    BaseRequestOptions,
    // lib providers
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }