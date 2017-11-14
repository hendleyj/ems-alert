import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Case } from '../case';
import { CaseService } from '../case.service';

import { Responder } from '../responder';

@Component({
    selector: 'app-create-user',
    styleUrls: ['./create-case.component.scss'],
    templateUrl: './create-case.component.html'
})
export class CreateCaseComponent implements OnInit {
    caseForm: FormGroup;

    // Created case
    createdCase: Case;

    constructor(private fb: FormBuilder, private caseService: CaseService) {}

    ngOnInit() {
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
        this.createdCase = new Case(-1,
            this.caseService.getDate(),
            this.caseForm.get('location').value,
            this.caseForm.get('respondee_name').value,
            '',
            '',
            this.caseForm.get('notes').value);

        // let responders: Responder[];

        // // Get Responder Locations
        // this.caseService.getAllResponders().subscribe(res => responders = res);

        // Send Alert
        this.caseService.sendAlert();

        // Get length for ID
        this.caseService.getCases().subscribe(
            result => {
                length = result.length;
                this.createdCase.id = length;
            },
            error => console.log('error'),
            () => {
                // Add case to database
                this.caseService.addCase(this.createdCase).subscribe();
            }
        );
    }

    public reset(): void {
        this.caseForm.reset();

    }
}
