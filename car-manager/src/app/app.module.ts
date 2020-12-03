import { ModeloModule } from './modules/modelo/modelo.module';
import { MarcaModule } from './modules/marca/marca.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { InterceptorsModule } from './modules/interceptors/interceptors.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MarcaModule,
    ModeloModule,
    HttpClientModule,
    InterceptorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
