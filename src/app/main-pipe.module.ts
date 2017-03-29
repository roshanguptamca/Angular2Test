import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { OrderBy } from './commons/pipes/orderby.pipe';
import { SearchPipe } from './commons/pipes/search.pipe';
import { ValueByKeyPipe } from './commons/pipes//value-by-key.pipe';

@NgModule({
  declarations:[SearchPipe,OrderBy,ValueByKeyPipe],
  imports:[CommonModule],
  exports:[SearchPipe,OrderBy,ValueByKeyPipe]
})

export class MainPipe{}