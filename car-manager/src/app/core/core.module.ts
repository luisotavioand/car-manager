import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MenuComponent } from './menu/menu.component';
import {MenubarModule} from 'primeng/menubar';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MenubarModule
  ],
  exports: [MenuComponent]
})
export class CoreModule { }
