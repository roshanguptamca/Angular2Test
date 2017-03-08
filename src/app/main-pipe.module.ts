import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { OrderBy } from './commons/pipes/orderby.pipe';
import { SearchPipe } from './commons/pipes/search.pipe';

@NgModule({
  declarations:[SearchPipe,OrderBy],
  imports:[CommonModule],
  exports:[SearchPipe,OrderBy]
})

export class MainPipe{}