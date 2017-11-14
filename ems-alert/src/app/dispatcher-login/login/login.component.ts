import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';

@Component({
    selector: 'app-dispatcher-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class DispatcherLoginComponent implements OnInit {
    loginForm: FormGroup;
    @Output() dispatcherLoginEvent = new EventEmitter<boolean>();
    passwordWrong: boolean;
    usernameWrong: boolean;

    constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

    ngOnInit() {
        this.createForm();
        this.passwordWrong = false;
        this.usernameWrong = false;
    }

    public createForm(): void {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    public onSubmit(): void {
        let res;

        this.loginService.processUserInfo(this.loginForm.get('username').value,
            this.loginForm.get('password').value, true)
            .subscribe(
                response => {
                    res = response;
                    if (res === 'password wrong') {
                        this.passwordWrong = true;
                        this.usernameWrong = false;
                    } else if (res === 'username wrong') {
                        this.usernameWrong = true;
                        this.passwordWrong = false;
                    } else {
                        this.router.navigate(['/dash']);
                    }
                },
                error => console.log(error)
        );
    }

    public reset(): void {
        this.loginForm.reset();
    }

    public register() {
        this.router.navigate(['/register']);
    }
}
