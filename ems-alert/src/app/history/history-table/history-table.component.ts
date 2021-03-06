import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { CaseService } from '../../case/case.service';
import { Case } from '../../case/case';

@Component({
    selector: 'app-history-table',
    styleUrls: ['./history-table.component.scss'],
    templateUrl: './history-table.component.html',
})
export class HistoryTableComponent implements OnInit {
    displayedColumns = ['caseId', 'respondeeName', 'location', 'notes']; // Columns
    caseDatabase = new CaseDatabase(this.caseService); // "Database" connection
    dataSource: CaseDataSource | null;

    // Modal variables
    modal: boolean;
    sourceCase: Case;
    existingResponder: boolean;
    responders: string[];
    responder_notes: string[];

    @ViewChild('filter') filter: ElementRef; // Table filter element

    constructor(private caseService: CaseService) { }

    ngOnInit() {
        // Initialize data source
        this.dataSource = new CaseDataSource(this.caseDatabase);
        this.modal = false;
        this.existingResponder = false;
    }

    setSource(data: Case) {
        this.sourceCase = data;

        if (data.respondee_name === undefined) {
            this.existingResponder = false;
        } else {
            this.existingResponder = true;
            this.responders = data.respondee_name;
            // .slice(0, data.responder_name.length - 1);
            this.responder_notes = data.respondee_notes;
            // .slice(1, data.responder_notes.length - 1);
        }
    }
}

// "Database"
export class CaseDatabase {
    dataChange: BehaviorSubject<Case[]> = new BehaviorSubject<Case[]>([]);
    index = 0; // Global index
    date = this.caseService.getDate();
    get data(): Case[] { return this.dataChange.value; }

    constructor(private caseService: CaseService) {
        // Updates cases in service
        this.caseService.getCases().subscribe(
            result => {
                for (; this.index < this.caseService.cases.length; this.index++) {
                    if (this.caseService.cases[this.index].date === this.date) {
                        this.addCase();
                    }
                }
            }
        );
    }

    // Method to add case
    addCase() {
        const copiedData = this.data.slice();

        copiedData.push(this.createNewCase());

        this.dataChange.next(copiedData);
    }

    createNewCase(): Case {
        return this.caseService.cases[this.index];
    }
}

// Data source to provide what data should be rendered in the table.
export class CaseDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');

    get filter(): string { return this._filterChange.value; }

    set filter(filter: string) { this._filterChange.next(filter); }

    constructor(private _database: CaseDatabase) {
        super();
    }

    connect(): Observable<Case[]> {
        const displayDataChanges = [
            this._database.dataChange,
            this._filterChange,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this._database.data.slice().filter((item: Case) => {
                const searchStr = (String(item.id) + item.respondee_name + item.location);
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
    }

    disconnect() { }
}
