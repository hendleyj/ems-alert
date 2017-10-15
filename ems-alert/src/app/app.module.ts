import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// Modules
import { AppRoutingModule } from './app-routing.module';

// declarations
import { AppComponent } from './app.component';
import { CreateCaseComponent } from './case/create-case/create-case.component';

// providers
import { CaseService } from './case/case.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateCaseComponent
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
    FlexLayoutModule
  ],
  providers: [
    CaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
