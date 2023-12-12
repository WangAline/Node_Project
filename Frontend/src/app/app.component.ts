import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  title = 'app2';

  ngOnInit(): void {
    console.log('AppComponent.ngOnInit');
  }
}
