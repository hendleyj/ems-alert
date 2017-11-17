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
        // let length = 0;
        this.createdCase = new Case(-1,
            this.caseService.getDate(),
            this.caseForm.get('location').value,
            this.caseForm.get('respondee_name').value,
            '',
            '',
            this.caseForm.get('notes').value);


        let responders: Responder[];
        const deviceIds: string[] = [];
        let geocoded_address: any;
        const latitude = '43.078263';
        const longitude = '-87.881969';

        // Get Responder Locations
        this.caseService.getAllResponders().subscribe(
             res => responders = res,
             err => console.log('error getting responders'),
             () => {
                // Geocode case location
                // this.caseService.geocode(this.createdCase.location).subscribe(res => geocoded_address = res);

                // Compile device ids into an array
                responders.forEach(element => {
                    deviceIds.push(element.device_id);
                });

                // Send Alert
                this.caseService.sendAlert(
                    {
                        // latitude : latitude,
                        // longitude : longitude,
                        location : this.createdCase.location,
                        respondee : this.createdCase.respondee_name,
                        notes : this.createdCase.notes,
                        responders : deviceIds
                    }
                );
             }
        );

        // Get length for ID
        // this.caseService.getCases().subscribe(
        //     result => {
        //         length = result.length;
        //         this.createdCase.id = length;
        //     },
        //     error => console.log('error'),
        //     () => {
        //         // Add case to database
        //         this.caseService.addCase(this.createdCase).subscribe();
        //     }
        // );
    }

    public reset(): void {
        this.caseForm.reset();
    }
}
