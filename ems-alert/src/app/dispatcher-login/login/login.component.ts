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

    constructor(private fb: FormBuilder, private router: Router,  private loginService: LoginService) { }

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
        this.loginService.processUserInfo(this.loginForm.get('username').value, this.loginForm.get('password').value, true)
        .subscribe(
            // response => resp = response.json(),
            // error => console.log('Bad Login Cridentials'),
            () => this.router.navigate(['/dash'])
        );
    }

    public reset(): void {
        this.loginForm.reset();
    }

    public register() {
        this.router.navigate(['/register']);
    }
}