import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [PageNotFoundComponent]
})
export class SharedModule { }
