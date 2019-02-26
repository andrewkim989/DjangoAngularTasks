// Modules

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskNewComponent } from './task-new/task-new.component';

// Services

import { TaskService } from './task.service';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    TaskService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
}