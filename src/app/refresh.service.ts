import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  readonly refreshTrigger$ = new Subject<any>();
  readonly triggerUpdate$ = new Subject<string[]>();
  constructor() { }
}
