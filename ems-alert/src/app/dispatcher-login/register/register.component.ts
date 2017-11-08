import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DispatcherLogin } from '../dispatcher_login';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dispatcher-register',
    styleUrls: ['./register.component.scss'],
    templateUrl: './register.component.html'
})
export class DispatcherRegisterComponent implements OnInit {
    registerForm: FormGroup;
    @Output() dispatcherRegisterEvent = new EventEmitter<boolean>();

    constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

    ngOnInit() {
        this.createForm();
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
            this.loginService.processUserInfo(this.registerForm.get('username').value,
            this.registerForm.get('password').value, false)
            .subscribe(
                // response => resp = response.json(),
                // error => console.log('Error in Register Process'),
                () => this.router.navigate(['/login'])
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