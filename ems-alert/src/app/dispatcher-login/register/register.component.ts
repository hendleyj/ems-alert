import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DispatcherLogin } from '../dispatcher_login';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-dispatcher-register',
    styleUrls: ['./register.component.scss'],
    templateUrl: './register.component.html'
})
export class DispatcherRegisterComponent implements OnInit {
    registerForm: FormGroup;
    @Output() dispatcherRegisterEvent = new EventEmitter<boolean>();
    isExistingUser;

    constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

    ngOnInit() {
        this.createForm();
        this.isExistingUser = false;
    }

    public createForm(): void {
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
            password_match: ['', Validators.required],
            terms: ['', Validators.required]
        });
    }

    public onSubmit(): void {
        if (this.areEqual()) {
            let res;

            this.loginService.processUserInfo(this.registerForm.get('username').value,
                this.registerForm.get('password').value, false)
                .subscribe(
                    response => res = response,
                    error => console.log(error),
                    () => {
                        if (res._body === '"true"') {
                            this.isExistingUser = true;
                        } else {
                            this.router.navigate(['/login']);
                        }
                    }
            );
        }
    }

    public reset(): void {
        this.registerForm.reset();
    }

    private areEqual(): boolean {
        let valid;

        (this.registerForm.get('password').value === this.registerForm.get('password_match').value) ? valid = true : valid = false;

        return valid;
    }
}
