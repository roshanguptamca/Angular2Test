import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArchivedFailureComponent } from './archived-failure.component';
import{ BroadbandComponent } from '../sub-navigation/broadband-component/broadband.component';
import{ FixedComponent } from '../sub-navigation/fixed-component/fixed-component';
import{ MobileComponent } from '../sub-navigation/mobile-component/mobile-component';
import{ ServiceguardComponent } from '../sub-navigation/serviceguard-component/serviceguard.component';
import{ OtherComponent } from '../sub-navigation/other-component/other-component';
import { AuthGuard } from '../_guards/index';
import { FailureOverviewComponent } from '../shared/index';

const ArchivedFailureRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'archived-failure',
    component: ArchivedFailureComponent,
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
    ArchivedFailureRouting
  ],
  declarations: [
      ArchivedFailureComponent
  ],

  providers: [
  ]
})
export class ArchivedFailureModule {}
