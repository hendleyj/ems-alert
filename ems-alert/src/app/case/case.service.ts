import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Case } from './case';

@Injectable()
export class CaseService {
    cases: Case[] = [];

    constructor(private http: Http) { }

    // Update cases stored by service
    getCases(): Observable<Case[]> {
        const response = this.http.get('http://localhost:4200/get/cases')
            .map((res: Response) => res.json())
            .catch(this.handleError);

        response.subscribe(res => this.cases = res);
        return response;
    }

    // Add user to database
    addCase(new_case: Case): Observable<Response> {
        const data = {
            date: new_case.date,
            location: new_case.location,
            respondee_name: new_case.respondee_name,
            notes: new_case.notes
        };

        if (this.findCaseById(data.id) == null) {
            const headers = new Headers({ 'Content-Type': 'application/json' });
            const options = new RequestOptions({ headers: headers });

            this.cases.push(new_case);
            return this.http.post('http://localhost:4200/create/case', data, options);
        }
    }

    // // Update a user in database
    // updateUser(oldName: String, user: User): Observable<User> {
    //     let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     var options = new RequestOptions({ headers: headers });

    //     return this.http.put('http://localhost:3000/update/users/' + oldName, user, options)
    //         .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    //         .catch(this.handleError);
    // }

    // // Delete a user from database
    // delete(user: User): void {
    //     this.http.delete('http://localhost:3000/delete/users/' + user.name)
    //         .catch(this.handleError)
    //         .subscribe((res: any) => this.users.splice(this.users.indexOf(user), 1));
    // }

    // Find case in array
    findCaseById(id: number): Case {
        for (let i = 0; i < this.cases.length; i++) {
            if (this.cases[i]. === id) {
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
        // In a real world app, you might use a remote logging infrastructure
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
