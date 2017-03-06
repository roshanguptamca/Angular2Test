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

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
 
import { AppComponent } from './app.component';
import { routing }        from './app.routing';

import {
  FooterComponent,
  HeaderComponent,
} from './shared';


//const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });

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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FailureModule,
    PlannedMaintenanceModule,
    ArchivedFailureModule,
    ArchivedPlannedMaintenanceModule,
    routing
  ],
  providers: [
    AuthGuard,
    UserService,
    AuthenticationService,
    // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }