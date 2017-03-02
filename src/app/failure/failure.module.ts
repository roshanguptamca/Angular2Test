import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { FailureComponent } from './failure.component';

const failureRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'failure',
    component: FailureComponent
  }
]);

@NgModule({
  imports: [
    failureRouting,
    SharedModule
  ],
  declarations: [
      FailureComponent
  ],

  providers: [
  ]
})
export class FailureModule {}
