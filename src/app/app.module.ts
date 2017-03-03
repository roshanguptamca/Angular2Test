import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FailureModule } from './failure/failure.module';
import { PlannedMaintenanceModule  } from './planned-maintenance/planned-maintenance.moule';
import { ArchivedFailureModule } from './archived-failure/archived-failure.module';
import { ArchivedPlannedMaintenanceModule  } from './archived-planned-maintenance/archived-planned-maintenance.moule';
import { BroadbandComponent } from './sub-navigation/broadband-component/broadband.component';
import{ FixedComponent } from './sub-navigation/fixed-component/fixed-component';
import{ MobileComponent } from './sub-navigation/mobile-component/mobile-component';
import{ ServiceguardComponent } from './sub-navigation/serviceguard-component/serviceguard.component';
import{ OtherComponent } from './sub-navigation/other-component/other-component';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';


import {
  FooterComponent,
  HeaderComponent,
  SharedModule,
  AuthGuard,
  UserService,
  ApiService,
  JwtService
} from './shared';


const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BroadbandComponent,
    FixedComponent,
    MobileComponent,
    ServiceguardComponent,
    OtherComponent
  ],
  imports: [
    AuthModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    rootRouting,
    FailureModule,
    PlannedMaintenanceModule,
    ArchivedFailureModule,
    ArchivedPlannedMaintenanceModule,
  ],
  providers: [
    ApiService,
    AuthGuard,
    UserService,
    JwtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
