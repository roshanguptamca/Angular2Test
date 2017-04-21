import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { OrderBy } from './commons/pipes/orderby.pipe';
import { SearchPipe } from './commons/pipes/search.pipe';
import { ValueByKeyPipe } from './commons/pipes//value-by-key.pipe';
import { CloseIconPipe } from './commons/pipes/close-icon.pipe';

@NgModule({
  declarations:[SearchPipe,OrderBy,ValueByKeyPipe,CloseIconPipe],
  imports:[CommonModule],
  exports:[SearchPipe,OrderBy,ValueByKeyPipe,CloseIconPipe]
})

export class MainPipe{}