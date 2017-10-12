//Imports
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule, MdButtonModule, MdCardModule, MdSelectModule, MdAutocompleteModule, MdInputModule, MdCheckboxModule, MdMenuModule, MdSidenavModule, MdRadioModule, MdSlideToggleModule, MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// modules
import { AppRoutingModule } from './app-routing.module';

//declarations
import { AppComponent } from './app.component';
import { CreateCaseComponent } from './case/create-case/create-case.component';

//providers
import { CaseService } from './case/case.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateCaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    CaseService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
