import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-dispatcher-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class DispatcherLoginComponent implements OnInit {
    loginForm: FormGroup;
    @Output() dispatcherLoginEvent = new EventEmitter<boolean>();

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    public createForm(): void {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    public onSubmit(): void {

    }

    public reset(): void {
        this.loginForm.reset();
    }

    public register(flag: boolean) {
        this.dispatcherLoginEvent.emit(flag);
    }
}
