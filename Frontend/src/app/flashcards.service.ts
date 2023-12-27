import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
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

  updateScores(deckId: number, scores: {hard: number, good: number, easy: number}): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${deckId}/scores`, scores);
  }
  getDeckTitle(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/title`, { responseType: 'text' });
  }
  updateDeckTitle(id: number, title: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/title`, { title });
  }
  getDecks(): Observable<any> {
    console.log('Sending request to:', this.apiUrl); // log the request URL
    return this.http.get<any>(this.apiUrl).pipe(
      tap(decks => console.log('Received response:', decks)) // log the response
    );
  }

  getDeck(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addDeck(title: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { title: title, flashcards: [], scores: { hard: 0, good: 0 ,easy: 0,} });
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
