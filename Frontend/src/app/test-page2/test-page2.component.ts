import { Component } from '@angular/core';

@Component({
  selector: 'app-test-page2',
  templateUrl: './test-page2.component.html',
  styleUrls: ['./test-page2.component.css']
})
export class TestPage2Component {
  numberValue = 1;
  onClickIncrementValue() {
    this.numberValue++;
   }


   onInputChanged($event: Event) {
    this.numberValue = +(<HTMLInputElement> $event.target).value;
   }
   
}
