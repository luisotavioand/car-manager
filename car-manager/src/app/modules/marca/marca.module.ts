import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcaRoutingModule } from './marca-routing.module';
import { MarcaComponent } from './pages/marca/marca.component';
import {TableModule} from 'primeng/table';
import { FilterService } from 'primeng/api';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [MarcaComponent],
  imports: [
    CommonModule,
    MarcaRoutingModule,
    TableModule,
    ButtonModule
  ],
  providers: [
    FilterService
  ]
})
export class MarcaModule { }
