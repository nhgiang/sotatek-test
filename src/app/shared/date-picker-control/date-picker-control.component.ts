import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { IDatePickerConfig } from 'ng2-date-picker';

@Component({
  selector: 'app-date-picker-control',
  templateUrl: './date-picker-control.component.html',
  styleUrls: ['./date-picker-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerControlComponent),
      multi: true
    }
  ]
})
export class DatePickerControlComponent implements OnInit, ControlValueAccessor {
  selectedDate: any;
  datePickerOptions: IAngularMyDpOptions;
  private onChangeFn: Function;

  constructor(
    private formGroup: FormGroupDirective

  ) { }

  writeValue(obj: Date): void {
    this.selectedDate = obj ? { isRange: false, singleDate: { jsDate: new Date(obj) } } : null;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
  }

  ngOnInit(): void {
    const maxDate = new Date();
    this.datePickerOptions = {
      dateRange: false,
      dateFormat: 'dd mmm yyyy',
      disableUntil: {
        year: maxDate.getFullYear(),
        month: maxDate.getMonth() + 1,
        day: maxDate.getDate() - 1,
      }
    };
  }

  onDateChange(date: IMyDateModel) {
    this.onChangeFn(date.singleDate?.formatted);
  }

}
