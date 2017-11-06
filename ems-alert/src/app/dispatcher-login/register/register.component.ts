import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

    constructor(private fb: FormBuilder, private loginService: LoginService) { }

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
            this.loginService.register(this.registerForm.get('username').value, this.registerForm.get('password').value).subscribe();
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
