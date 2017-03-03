import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FailureModule } from './failure/failure.module';
import { BroadbandComponent } from './sub-navigation/broadband-component/broadband.component';
import{ FixedComponent } from './sub-navigation/fixed-component/fixed-component';
import{ MobileComponent } from './sub-navigation/mobile-component/mobile-component';
import{ ServiceguardComponent } from './sub-navigation/serviceguard-component/serviceguard.component';
import{ OtherComponent } from './sub-navigation/other-component/other-component';

import { AppComponent } from './app.component';

import {
  FooterComponent,
  HeaderComponent,
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
    BrowserModule,
    FormsModule,
    HttpModule,
    rootRouting,
    FailureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
