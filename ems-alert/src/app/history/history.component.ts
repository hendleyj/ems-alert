import { Component, Input } from '@angular/core';
// import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute, Params } from '@angular/router';

import { Case } from '../case/case';
import { CaseService } from '../case/case.service';

@Component({
    selector: 'app-create-user',
    styleUrls: ['./create-case.component.scss'],
    templateUrl: './create-case.component.html'
})
export class CreateCaseComponent {


    constructor(private caseService: CaseService, private router: Router) {

    }

    public getTodaysCases(): void {

    }

}
