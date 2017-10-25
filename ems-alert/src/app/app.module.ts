import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatTableModule, MatCardModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// Modules
import { AppRoutingModule } from './app-routing.module';

// declarations
import { AppComponent } from './app.component';
import { CreateCaseComponent } from './case/create-case/create-case.component';
import { CaseHistoryComponent } from './history/history.component';
import { HistoryTableComponent } from './history/history-table/history-table.component';
// providers
import { CaseService } from './case/case.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateCaseComponent,
    CaseHistoryComponent,
    HistoryTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    FlexLayoutModule
  ],
  providers: [
    CaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
