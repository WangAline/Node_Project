import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DecksService {
  private apiUrl = 'http://localhost:3000/flashcardsDeck';

  constructor(private http: HttpClient) { }

  getDecks(): Observable<any> {
    console.log('Sending request to:', this.apiUrl); // log the request URL
    return this.http.get<any>(this.apiUrl).pipe(
      tap(decks => console.log('Received response:', decks)) // log the response
    );
  }

  getDeck(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addDeck(): Observable<any> {
    return this.http.post<any>(this.apiUrl, { flashcards: [], scores: { again: 0, hard: 0, good: 0 } });
  }

  removeDeck(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  addFlashcard(deckId: number, flashcard: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${deckId}/flashcards`, flashcard);
  }

  removeFlashcard(deckId: number, flashcardId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${deckId}/flashcards/${flashcardId}`);
  }
}
