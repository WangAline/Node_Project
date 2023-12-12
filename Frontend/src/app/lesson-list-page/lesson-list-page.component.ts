import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
 selector: 'app-lesson-list-page',
 templateUrl: './lesson-list-page.component.html'
})
export class LessonListPageComponent implements OnInit, OnDestroy {
 constructor(private httpClient: HttpClient) {
 console.log("LessonListPageComponent.constructor()");
 }
 ngOnInit(): void {
 console.log("LessonListPageComponent.ngOnInit()");
 }
 ngOnDestroy(): void {
 console.log("LessonListPageComponent.ngOnDestroy()");}

 onClick() { this.httpClient.get('/api/learning-package').subscribe({
    next: (res) => {
      console.log('OK, got ', res);
    }, error: (err) => {
      console.error('Failed to query http', err)
    }
  });}
}
