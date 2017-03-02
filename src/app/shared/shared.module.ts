import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    HttpModule,
    RouterModule
  ],
  declarations: [
  ],
  exports: [
    HttpModule,
    RouterModule
  ]
})
export class SharedModule {}