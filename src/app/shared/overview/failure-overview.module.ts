import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FailureOverviewComponent } from './failure-overview.component';
import { AuthGuard } from '../../_guards/index';

const failureOverviewRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'overview',
    canActivate: [AuthGuard] ,
    component: FailureOverviewComponent
  }
]);

@NgModule({
  imports: [
    failureOverviewRouting
  ],
  declarations: [
      FailureOverviewComponent
  ],

  providers: [
  ]
})
export class FailureOverviewModule {}
