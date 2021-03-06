import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DispatcherLogin } from './dispatcher_login';

@Injectable()
export class LoginService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    processUserInfo(username: string, password: string, login: boolean): Observable<Response> {
        let route;
        const data = {
            username: username,
            password: password
        };

        if (login) {
            route = 'login';
        } else {
            route = 'register';
        }

        return this.http.post('http://37.48.113.142:4200/dispatcher/' + route, data, this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    //////////////////////////
    // Helper methods
    //////////////////////////

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
