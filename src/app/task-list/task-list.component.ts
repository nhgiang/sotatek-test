import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Task } from 'types/viewmodels';
import { storageUtils } from 'utils/storage';
import { RefreshService } from '../refresh.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  search: string;
  items$: Observable<Task[]>;
  listItemChecked: Task[] = [];
  constructor(
    private refreshService: RefreshService,

  ) { }

  ngOnInit(): void {
    this.items$ = this.refreshService.refreshTrigger$.pipe(
      startWith(null),
      map(search => {
        const items = (storageUtils.get('task') as Task[] || []);
        items.sort((a, b) => {
          return (new Date(a.dueDate)).getTime() - (new Date(b.dueDate)).getTime();
        });
        this.search = search;
        return search ? items.filter(t => t.title.search(search) !== -1) : items;
      })
    );
  }

  onSearch(value: any) {
    this.refreshService.refreshTrigger$.next(value);
  }

  handleCheckList(value: { checked: boolean, item: Task }) {
    if (value.checked) {
      this.listItemChecked.push(value.item);
    } else {
      const index = this.listItemChecked.findIndex(t => t.id === value.item.id);
      this.listItemChecked.splice(index, 1);
    }
  }

  removeListItemChecked() {
    const idArr = this.listItemChecked.map(t => t.id);
    const objRemain = (storageUtils.get('task') as Task[]).filter(t => !idArr.includes(t.id));
    storageUtils.set('task', objRemain);
    this.listItemChecked = [];
    this.refreshService.refreshTrigger$.next();
  }

  updateListItemChecked() {
    const idArr = this.listItemChecked.map(t => t.id);
    this.refreshService.triggerUpdate$.next(idArr);
    this.listItemChecked = [];
  }

  removeItem(id: string) {
    const objRemain = (storageUtils.get('task') as Task[]).filter(t => t.id === id);
    storageUtils.set('task', objRemain);
    this.refreshService.refreshTrigger$.next();
  }
}
