import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Case } from './case';
import { Responder } from './responder';

@Injectable()
export class CaseService {
    cases: Case[] = [];

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    // Add case to database
    addCase(new_case: Case): Observable<Response> {
        const data = {
            id: new_case.id,
            date: new_case.date,
            location: new_case.location,
            respondee_name: new_case.respondee_name,
            notes: new_case.notes
        };

        if (this.findCaseById(data.id) == null) {
            this.cases.push(new_case);
            return this.http.post('http://37.48.113.142:4200/create/case', data, this.options);
        }
    }

    // Update cases stored by service
    getCases(): Observable<Case[]> {
        const response = this.http.get('http://37.48.113.142:4200/get/cases')
            .map((res: Response) => res.json())
            .catch(this.handleError);

        response.subscribe(res => this.cases = res);
        return response;
    }

    // Send Alert
    sendAlert(): void {
        // Emergency location
        const _location = '1900 N Prospect Ave, Milwaukee, WI 53202';

        // const myParams = new URLSearchParams();
        // myParams.append('address', _location);
        // const options = new RequestOptions({ headers: this.headers, params: myParams });

        // let geocode;

        this.http.post('http://37.48.113.142:4200/responder/send', this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError)
            .subscribe(
                // res => geocode = res,
                // err => console.log(err),
                // () => {
                //     console.log(geocode);
                // }
            );

        // return this.http.post('http://37.48.113.142:4200/map-api/', data, this.options)
        //     .map((res: Response) => res.json())
        //     .catch(this.handleError);
    }

    getAllResponders(): Observable<Responder[]> {
        return this.http.get('http://37.48.113.142:4200/get/responders', this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    ////////////////////////
    // Helper Funcitons
    ////////////////////////
    // Find case in array
    findCaseById(id: number): Case {
        for (let i = 0; i < this.cases.length; i++) {
            if (this.cases[i].id === id) {
                return this.cases[i];
            }
        }
        return null;
    }

    getDate(): string {
        const dateObj = new Date(),
            month = dateObj.getMonth() + 1,
            day = dateObj.getDate(),
            year = dateObj.getFullYear();

        let monthStr: String;
        if (month === 1) { monthStr = 'January'; } if (month === 2) { monthStr = 'February'; }
        if (month === 3) { monthStr = 'March'; } if (month === 4) { monthStr = 'April'; }
        if (month === 5) { monthStr = 'May'; } if (month === 6) { monthStr = 'June'; }
        if (month === 7) { monthStr = 'July'; } if (month === 8) { monthStr = 'August'; }
        if (month === 9) { monthStr = 'September'; } if (month === 10) { monthStr = 'October'; }
        if (month === 11) { monthStr = 'November'; } if (month === 12) { monthStr = 'December'; }

        return monthStr + ' ' + day + ', ' + year;
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = '${error.status} - ${error.statusText || "} ${err}';
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
