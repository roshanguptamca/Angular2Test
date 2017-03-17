import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlannedMaintenanceComponent } from './planned-maintenance.component';
import{ BroadbandComponent } from '../sub-navigation/broadband-component/broadband.component';
import{ FixedComponent } from '../sub-navigation/fixed-component/fixed-component';
import{ MobileComponent } from '../sub-navigation/mobile-component/mobile-component';
import{ ServiceguardComponent } from '../sub-navigation/serviceguard-component/serviceguard.component';
import{ OtherComponent } from '../sub-navigation/other-component/other-component';
import { AuthGuard } from '../_guards/index';
import { FailureOverviewComponent } from '../shared/index';

const plannedMaintenanceRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'planned-maintenance',
    component: PlannedMaintenanceComponent,
    canActivate: [AuthGuard] ,
    children: [
            {path: '', redirectTo: 'broadband', pathMatch: 'full'},
            {path: 'broadband', component: BroadbandComponent},
            {path: 'fixed', component: FixedComponent},
            {path: 'mobile', component: MobileComponent},
            {path: 'serviceguard', component: ServiceguardComponent},
            {path: 'other', component: OtherComponent},
            {path: 'broadband/overview/:{id}', component: FailureOverviewComponent},
            {path: 'fixed/overview/:{id}', component: FailureOverviewComponent},
            {path: 'serviceguard/overview/:{id}', component: FailureOverviewComponent},
            {path: 'other/overview/:{id}', component: FailureOverviewComponent},
            {path: 'mobile/overview/:{id}', component: FailureOverviewComponent}
        ]
  }
]);

@NgModule({
  imports: [
    plannedMaintenanceRouting
  ],
  declarations: [
      PlannedMaintenanceComponent
  ],

  providers: [
  ]
})
export class PlannedMaintenanceModule {}
