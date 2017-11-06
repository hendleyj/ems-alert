import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

@Component({
    selector: 'app-main-dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class MainDashboardComponent {
    history: boolean;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

    constructor() {
        this.history = false;
    }

}
