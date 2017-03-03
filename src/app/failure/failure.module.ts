import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { FailureComponent } from './failure.component';
import{ BroadbandComponent } from '../sub-navigation/broadband-component/broadband.component';
import{ FixedComponent } from '../sub-navigation/fixed-component/fixed-component';
import{ MobileComponent } from '../sub-navigation/mobile-component/mobile-component';
import{ ServiceguardComponent } from '../sub-navigation/serviceguard-component/serviceguard.component';
import{ OtherComponent } from '../sub-navigation/other-component/other-component';

const failureRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'failure',
    component: FailureComponent,
    children: [
            {path: '', redirectTo: 'broadband', pathMatch: 'full'},
            {path: 'broadband', component: BroadbandComponent},
            {path: 'fixed', component: FixedComponent},
            {path: 'mobile', component: MobileComponent},
            {path: 'serviceguard', component: ServiceguardComponent},
            {path: 'other', component: OtherComponent}
        ]
  }
]);

@NgModule({
  imports: [
    failureRouting,
    SharedModule,
  ],
  declarations: [
      FailureComponent
  ],

  providers: [
  ]
})
export class FailureModule {}
