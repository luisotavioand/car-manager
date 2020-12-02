import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcaRoutingModule } from './marca-routing.module';
import { MarcaComponent } from './pages/marca/marca.component';
import { TableModule } from 'primeng/table';
import { ConfirmationService, FilterService, PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {RippleModule} from 'primeng/ripple';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MarcaComponent],
  imports: [
    CommonModule,
    MarcaRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    DropdownModule,
    AutoCompleteModule,
    RippleModule,
    ConfirmDialogModule
  ],
  providers: [
    FilterService,
    ConfirmationService,
    PrimeNGConfig
  ]
})
export class MarcaModule { }
