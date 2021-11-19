import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';
import { EditComponent } from './edit.component';
import { ElfListComponent } from './elf-list.component';
import {CommonModule} from "@angular/common";
import { AlfComponent } from './alf.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    EditComponent,
    ElfListComponent,
    AlfComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
