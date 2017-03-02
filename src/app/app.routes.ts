import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Route Configuration
export const routes: Routes = [
//   { path: 'failure', component: CatListComponent },
//   { path: 'planned-maintence', component: DogListComponent },
//   { path: 'archived-failure', component: CatListComponent },
//   { path: 'archived-planned-maintence', component: DogListComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);