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
    // Update case fields
    location = '';
    respondee = '';
    notes = '';

    caseForm: FormGroup;

    // Created case
    createdCase: Case;

    // Address validation
    validAddress = true;

    constructor(private fb: FormBuilder, private caseService: CaseService) { }

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
        let latitude;
        let longitude;

        // Get Responder Locations
        this.caseService.getAllResponders().subscribe(
            res => responders = res,
            err => console.log('error getting responders'),
            () => {
                // Geocode case location
                this.caseService.geocode(this.createdCase.location).subscribe(
                    res => {
                        if (res.results.length === 0) {
                            this.validAddress = false;
                            this.location = loc;
                            this.respondee = respon;
                            this.notes = not;
                        } else {
                            this.validAddress = true;
                            latitude = res.results[0].geometry.location.lat;
                            longitude = res.results[0].geometry.location.lng;
                        }
                    },
                    err => { },
                    () => {
                        if (this.validAddress) {
                            this.caseService.getCases().subscribe(
                                result => {
                                    length = result.length;
                                    this.createdCase.id = length;
                                },
                                error => console.log('error'),
                                () => {
                                    // Add case to database
                                    this.caseService.addCase(this.createdCase, latitude, longitude).subscribe(
                                        () => {
                                            // Send Alert
                                            if (deviceIds.length > 0) {
                                                this.caseService.sendAlert({
                                                    caseid: this.createdCase.id + '',
                                                    latitude: latitude + '',
                                                    longitude: longitude + '',
                                                    patient: this.createdCase.patient_name + '',
                                                    notes: this.createdCase.notes,
                                                    responders: deviceIds
                                                });
                                                this.reset();
                                            } else {
                                                console.log('There are not devices to send the alert to!');
                                            }
                                        }
                                    );
                                }
                            );
                        } else {

                        }
                    }
                );

                // Compile device ids into an array
                responders.forEach(element => {
                    deviceIds.push(element.device_id);
                });
            }
        );


    }

    public reset(): void {
        this.caseForm.reset();
    }
}
