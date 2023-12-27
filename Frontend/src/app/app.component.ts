import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  title = 'Anki Angular App';

  ngOnInit(): void {
    console.log('AppComponent.ngOnInit');
  }
}

