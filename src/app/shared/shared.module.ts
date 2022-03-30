import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { ControlErrorComponent } from './control-error/control-error.component';
import { DatePickerControlComponent } from './date-picker-control/date-picker-control.component';
import { ControlErrorContainerDirective } from './directives/control-error-container.directive';
import { FormSubmitDirective } from './directives/form-submit.directive';
import { ControlErrorsDirective } from './directives/validate-form.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMyDatePickerModule
  ],
  declarations: [
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    ControlErrorComponent,
    FormSubmitDirective,
    DatePickerControlComponent
  ],
  exports: [
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    FormSubmitDirective,
    ReactiveFormsModule,
    FormsModule,
    DatePickerControlComponent
  ]
})
export class SharedModule { }
