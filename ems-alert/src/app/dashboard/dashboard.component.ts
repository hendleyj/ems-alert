import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 
import { MatMenuTrigger } from '@angular/material';

@Component({
    selector: 'app-main-dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class MainDashboardComponent {
    history: boolean;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

    constructor(private router: Router) {
        this.history = false;
    }

    private logout(): void {
        this.router.navigate(['/login']);
    }
}