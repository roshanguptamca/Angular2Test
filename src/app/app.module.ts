import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FailureModule } from './failure/failure.module';

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
    HeaderComponent
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
