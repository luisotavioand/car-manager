import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModeloRoutingModule } from './modelo-routing.module';
import { ModeloComponent } from './pages/modelo/modelo.component';
import { TableModule } from 'primeng/table';
import { FilterService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ModeloComponent],
  imports: [
    CommonModule,
    ModeloRoutingModule,
    TableModule,
    CardModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule
  ],
  exports: [ModeloComponent],
  providers: [ FilterService, ConfirmationService ]
})
export class ModeloModule { }
