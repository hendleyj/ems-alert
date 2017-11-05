import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

import { CaseService } from './case/case.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  history: boolean;
  login: boolean;
  registered: boolean;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private caseService: CaseService) {
    this.history = false;
    this.login = false;
  }

  registerEvent(registered: boolean) {
    this.registered = registered;
  }
}
