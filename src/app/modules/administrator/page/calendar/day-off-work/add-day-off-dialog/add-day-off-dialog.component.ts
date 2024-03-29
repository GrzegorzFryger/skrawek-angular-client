import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {DayOffWork} from '../../../../../../data/model/absence/day-off-work';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-day-off-dialog',
  templateUrl: './add-day-off-dialog.component.html',
  styleUrls: ['./add-day-off-dialog.component.scss']
})
export class AddDayOffDialogComponent implements OnInit {

  dayOff: DayOffWork;
  form: FormGroup;
  formResponse: Observable<DayOffWork>;
  formResponseSub: Subject<DayOffWork>;

  constructor(public dialogRef: MatDialogRef<AddDayOffDialogComponent>,
              private fb: FormBuilder) {
    this.formResponseSub = new Subject<DayOffWork>();
    this.formResponse = this.formResponseSub.asObservable();
  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.initializeForm();
  }

  addDayOffSubmit() {
    this.dayOff = new DayOffWork();
    this.dayOff.date = new Date(this.form.get('date').value);
    this.dayOff.name = this.form.get('name').value;
    this.dayOff.eventType = this.form.get('type').value;

    this.formResponseSub.next(this.dayOff);
    this.dialogRef.close(null);

  }

  cancelClick(): void {
    this.dialogRef.close(null);
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      date: [
        new Date(), [Validators.required]
      ],
      name: [
        '', [Validators.required, Validators.minLength(5)]
      ],
      type: [
        '', [Validators.required]
      ]
    });
  }

}
