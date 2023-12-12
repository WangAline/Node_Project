import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-number-display',
  templateUrl: './number-display.component.html'
})
export class NumberDisplayComponent {

  @Input()
  value: number = 1;

}
