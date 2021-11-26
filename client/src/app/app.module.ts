import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';
import { EditComponent } from './edit.component';
import { ElfListComponent } from './elf-list.component';
import {CommonModule} from "@angular/common";
import { AlfComponent } from './alf.component';
import {HttpClientModule} from "@angular/common/http";
import { ElfFormComponent } from './elf-form.component';
import {FormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {devTools} from "@ngneat/elf-devtools";

!environment.production ? devTools() : null;

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    EditComponent,
    ElfListComponent,
    AlfComponent,
    ElfFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
