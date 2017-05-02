import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { OrderBy } from './commons/pipes/orderby.pipe';
import { SearchPipe } from './commons/pipes/search.pipe';
import { ValueByKeyPipe } from './commons/pipes//value-by-key.pipe';
import { CustomDatePipe } from './commons/pipes/date.pipe';
import { CapitalizePipe } from './commons/pipes/capitalize.pipe';

@NgModule({
  declarations:[SearchPipe,OrderBy,ValueByKeyPipe,CustomDatePipe,CapitalizePipe],
  imports:[CommonModule],
  exports:[SearchPipe,OrderBy,ValueByKeyPipe,CustomDatePipe,CapitalizePipe]
})

export class MainPipe{}