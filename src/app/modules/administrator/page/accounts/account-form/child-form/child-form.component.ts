import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

interface GenderType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.scss', '../common-form-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildFormComponent implements OnInit {
  @Output() formValuesChanged = new EventEmitter<{ form: FormGroup }>();
  @Input() initialState: { [key: string]: any };
  @Input() mode: string;

  form: FormGroup;
  turnOnField: boolean;

  genderTypes: GenderType[] = [
    {value: 'MALE', viewValue: 'Chłopiec'},
    {value: 'FEMALE', viewValue: 'Dziewczynka'}
  ];

  constructor(private fb: FormBuilder) {
    this.turnOnField = true;
  }

  ngOnInit(): void {
    this.createFromObject();

    this.form.get('pesel').valueChanges.subscribe(peselValue => {
      if (this.mode === 'create') {
        this.changeStateOptionalFields(peselValue);
      }
    });

    this.form.valueChanges.subscribe(() => {
      this.formValuesChanged.emit({form: this.form});
    });
  }

  public get f() {
    return this.form.controls;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  public hasChildError = (childName: string, controlName: string, errorName: string) => {
    return this.form.get(childName).get(controlName).hasError(errorName);
  };


  private changeStateOptionalFields(val: string): void {
    if (val !== '') {
      this.form.get('gender').disable();
      this.form.get('dateOfBirth').disable();
      this.turnOnField = false;
    } else {
      this.form.get('gender').enable();
      this.form.get('dateOfBirth').enable();
      this.form.get('pesel').disable();
      this.turnOnField = true;
    }
  }

  private createFromObject(): void {
    this.form = this.fb.group({
      name: [
        this.initialState?.name ? this.initialState.name : '',
        [Validators.required, Validators.min(3), Validators.pattern('^[a-zA-Z ]*$')]
      ],
      surname: [
        this.initialState?.surname ? this.initialState.surname : '',
        [Validators.required, Validators.min(3), Validators.pattern('^[a-zA-Z ]*$')]
      ],
      pesel: [
        this.initialState?.pesel ? this.initialState.pesel : '',
        [Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)]
      ],
      gender: [
        this.initialState?.gender ? this.initialState?.gender : '',
        [Validators.required]
      ],
      dateOfBirth: [
        this.initialState?.dateOfBirth ? this.initialState?.dateOfBirth : '',
        [Validators.required]
      ],
      startDate: [
        {value: this.initialState?.startDate ? this.initialState?.startDate : '', disabled: this.mode === 'create'},
        [Validators.required]
      ],
      endDate: [
        {value: this.initialState?.endDate ? this.initialState?.endDate : '', disabled: this.mode === 'create'},
        [Validators.required]
      ],
      postalCode: [this.initialState?.postalCode ? this.initialState.postalCode : '', [Validators.required]],
      city: [this.initialState?.city ? this.initialState.city : '', [Validators.required]],
      streetNumber: [this.initialState?.streetNumber ? this.initialState.streetNumber : '', [Validators.required]]
    });
  }
}
