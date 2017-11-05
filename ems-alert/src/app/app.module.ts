import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatTableModule, MatCardModule, MatMenuModule, MatCheckboxModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// Modules
import { AppRoutingModule } from './app-routing.module';

// declarations
import { AppComponent } from './app.component';
import { DispatcherLoginComponent } from './login/login.component';
import { DispatcherRegisterComponent } from './login/register/register.component';
import { CreateCaseComponent } from './case/create-case/create-case.component';
import { CaseHistoryComponent } from './history/history.component';
import { HistoryTableComponent } from './history/history-table/history-table.component';

// providers
import { CaseService } from './case/case.service';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    DispatcherLoginComponent,
    DispatcherRegisterComponent,
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
    MatCheckboxModule,
    FlexLayoutModule
  ],
  providers: [
    CaseService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
