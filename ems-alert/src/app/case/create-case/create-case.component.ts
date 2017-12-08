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

    // Address validation
    validAddress: boolean;
    latitude: any;
    longitude: any;

    constructor(private fb: FormBuilder, private caseService: CaseService) { }

    ngOnInit() {
        this.createForm();
        this.validAddress = true;
    }

    public createForm(): void {
        this.caseForm = this.fb.group({
            location: ['', Validators.required],
            respondee_name: ['', Validators.required],
            notes: ['', Validators.required]
        });
    }

    public validateAddress() {
        const tempLocation = this.caseForm.get('location').value;

        if (tempLocation.split(' ').length !== 7) {
            this.validAddress = false;
        } else {
            this.caseService.geocode(tempLocation).subscribe(
                res => {
                    if (res.results.length === 0) {
                        this.validAddress = false;
                    } else {
                        this.validAddress = true;
                        this.latitude = res.results[0].geometry.location.lat;
                        this.longitude = res.results[0].geometry.location.lng;
                    }
                },
                err => { },
                () => { }
            );
        }
    }

    public onSubmit(): void {
        // Save case data
        const loc = this.caseForm.get('location').value;
        const respon = this.caseForm.get('respondee_name').value;
        const not = this.caseForm.get('notes').value;

        this.createdCase = new Case(-1,
            this.caseService.getDate(),
            loc,
            respon,
            [],
            '',
            not,
            []
        );

        let responders: Responder[];
        const deviceIds: string[] = [];

        // Get Responder Locations
        this.caseService.getAllResponders().subscribe(
            res => {
                responders = res;
                // Compile device ids into an array
                responders.forEach(element => {
                    if (element.device_id !== '') {
                        deviceIds.push(element.device_id);
                    }
                });
            },
            err => console.log('error getting responders'),
            () => {
                this.caseService.getCases().subscribe(
                    result => {
                        length = result.length;
                        this.createdCase.id = length;
                    },
                    error => console.log('error'),
                    () => {
                        // Add case to database
                        this.caseService.addCase(this.createdCase, this.latitude, this.longitude).subscribe(
                            () => {
                                // Send Alert
                                if (deviceIds.length > 0) {
                                    this.caseService.sendAlert({
                                        caseid: this.createdCase.id + '',
                                        latitude: this.latitude + '',
                                        longitude: this.longitude + '',
                                        patient: this.createdCase.patient_name + '',
                                        notes: this.createdCase.notes,
                                        responders: deviceIds
                                    });
                                    this.reset();
                                } else {
                                    console.log('There are no devices to send the alert to!');
                                }
                            }
                        );
                    }
                );
            }
        );
    }

    public reset(): void {
        this.caseForm.reset();
    }
}
