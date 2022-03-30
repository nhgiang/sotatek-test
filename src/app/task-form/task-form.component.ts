import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Piority } from 'types/enums';
import { Task } from 'types/viewmodels';
import { storageUtils } from 'utils/storage';
import { Ultilities } from 'utils/validators';
import { CValidators } from '../shared/ultilities/custom-validator';
import { v4 as uuidv4 } from 'uuid';
import { RefreshService } from '../refresh.service';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() data: Task;
  form: FormGroup;
  Piority = Piority;

  constructor(
    private fb: FormBuilder,
    private refreshService: RefreshService
  ) { }

  ngOnInit(): void {
    this.buildForm(this.data);
    this.refreshService.triggerUpdate$.subscribe(idArr => {
      if (idArr.includes(this.data?.id)) {
        this.submit();
      }
    });
  }

  buildForm(data: Task) {
    this.form = this.fb.group({
      title: [data?.title, CValidators.required('Title is required')],
      description: [data?.description],
      dueDate: [data?.dueDate, CValidators.required('Due date is required')],
      piority: [data?.piority || Piority.NORMAL]
    });
  }

  submit() {
    console.log(this.form);
    Ultilities.validateForm(this.form);
    const data = storageUtils.get('task') as Task[] || [];
    const body = { ...this.form.value, id: uuidv4() };
    if (this.data) {
      // data.find(t => t.id === this.data.id) = body;
      const index = data.findIndex(t => t.id === this.data.id);
      data[index] = { id: this.data.id, ...body };
      storageUtils.set('task', data);
    } else {
      data.push(body);
      storageUtils.set('task', data);
    }
    this.refreshService.refreshTrigger$.next();
    this.form.reset({ piority: Piority.NORMAL });
  }
}
