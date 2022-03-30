import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent implements OnInit {
  hide = true;
  // tslint:disable-next-line: variable-name
  _text: any;
  @Input() set text(value: any) {
    if (value !== this.text) {
      this._text = value;
      this.hide = !value;
      this.cdr.detectChanges();
    }
  };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

}
