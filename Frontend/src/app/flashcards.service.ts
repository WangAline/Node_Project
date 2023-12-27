import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {
  private apiUrl = 'http://localhost:3000/flashcardsDeck';


  constructor(private http: HttpClient) { }

  getFlashcards(deckId: number): Observable<any> {
    const url = `${this.apiUrl}/${deckId}/flashcards`;
    console.log('Sending request to:', url); // log the request URL
    return this.http.get<any>(url).pipe(
      tap(flashcards => console.log('Received response:', flashcards)) // log the response
    );
  }
  getScores(deckId: number): Observable<any> {
    const url = `${this.apiUrl}/${deckId}/scores`;
    return this.http.get<any>(url).pipe(
      tap(scores => console.log('Received response:', scores)) // log the response
    );
  }

  updateScores(deckId: number, scores: {again: number, hard: number, good: number}): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${deckId}/scores`, scores);
  }
}
