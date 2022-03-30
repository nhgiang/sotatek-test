import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'types/viewmodels';
import { storageUtils } from 'utils/storage';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() data: Task;
  // tslint:disable: no-output-on-prefix
  @Output() onCheck = new EventEmitter<{ checked: boolean, item: Task }>();
  @Output() onRemove = new EventEmitter();
  isEdit = false;
  checkboxId: string;

  constructor() { }

  ngOnInit(): void {
    this.checkboxId = uuidv4();
  }

  showDetail() {
    this.isEdit = true;
  }

  onChange(value: any) {
    this.onCheck.emit({
      checked: value.target.checked,
      item: this.data
    });
  }

  remove() {
    this.onRemove.emit();
  }
}
