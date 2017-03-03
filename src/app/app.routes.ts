// Imports
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Route Configuration
export const routes: Routes = [
  {
    path: '/',
    redirectTo: '/failure'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
