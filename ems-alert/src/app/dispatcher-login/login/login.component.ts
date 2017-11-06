import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dispatcher-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class DispatcherLoginComponent implements OnInit {
    loginForm: FormGroup;
    @Output() dispatcherLoginEvent = new EventEmitter<boolean>();

    constructor(private fb: FormBuilder, private router: Router) { }

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


        this.router.navigate(['/dash']);
    }

    public reset(): void {
        this.loginForm.reset();
    }

    public register() {
        this.router.navigate(['/register']);
    }
}
