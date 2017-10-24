import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute, Params } from '@angular/router';

import { Case } from '../case';
import { CaseService } from '../case.service';

@Component({
    selector: 'app-create-user',
    styleUrls: ['./create-case.component.scss'],
    templateUrl: './create-case.component.html'
})
export class CreateCaseComponent {
    caseForm: FormGroup;

    // Created case
    createdCase: Case;

    constructor(private fb: FormBuilder, private caseService: CaseService, private router: Router) {
        this.createForm();
    }

    public createForm(): void {
        this.caseForm = this.fb.group({
            location: ['', Validators.required],
            respondee_name: ['', Validators.required],
            notes: ['', Validators.required]
        });
    }

    public onSubmit(): void {
        let length = 0;

        // Get length for ID
        this.caseService.getCases().subscribe(
            result => {
                length = result.length;
                this.createdCase = new Case(length,
                    this.caseService.getDate(),
                    this.caseForm.get('location').value,
                    this.caseForm.get('respondee_name').value,
                    '',
                    '',
                    this.caseForm.get('notes').value);
            },
            error => console.log('error'),
            () => {
                this.caseService.addCase(this.createdCase).subscribe(err => console.log(err));
            }
        );
    }

    public reset(): void {
        this.caseForm.reset();
    }
}
