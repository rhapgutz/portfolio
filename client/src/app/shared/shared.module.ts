import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { LoadingComponent } from "../spending/components/loading/loading.component";
import { MessagesComponent } from "../spending/components/messages/messages.component";
import { LoadingService } from "../spending/components/loading/loading.service";
import { FilterDateService } from "../spending/components/filter-date/filter-date.service";
import { TransactionsService } from "../spending/pages/transactions/transactions.service";
import { MessagesService } from "../spending/components/messages/messages.service";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [LoadingComponent, MessagesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ScrollingModule,
    DragDropModule,
    FontAwesomeModule,
  ],
  exports: [
    MaterialModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ScrollingModule,
    DragDropModule,
    FontAwesomeModule,
    LoadingComponent,
    MessagesComponent,
  ],
  providers: [
    LoadingService,
    DatePipe,
    FilterDateService,
    TransactionsService,
    MessagesService,
  ],
})
export class SharedModule {}
