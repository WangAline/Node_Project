import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {
  private apiUrl = 'http://localhost:3000/flashcardsDeck';


  constructor(private http: HttpClient) { }

  getFlashcards(deckId: number): Observable<any> { // fetch all the flashcards from a deck
    const url = `${this.apiUrl}/${deckId}/flashcards`;
    console.log('Sending request to:', url);
    return this.http.get<any>(url).pipe(
      tap(flashcards => console.log('Received response:', flashcards)),
      catchError(this.handleError)
    );
  }
  getScores(deckId: number): Observable<any> { // fetch the scores
    const url = `${this.apiUrl}/${deckId}/scores`;
    return this.http.get<any>(url).pipe(
      tap(scores => console.log('Received response:', scores)),
      catchError(this.handleError)
    );
  }

  updateScores(deckId: number, scores: {hard: number, good: number, easy: number}): Observable<any> { // change the scores
    return this.http.put<any>(`${this.apiUrl}/${deckId}/scores`, scores).pipe(
      catchError(this.handleError)
    );
  }
  getDeckTitle(id: number): Observable<any> { // fetch the deck title
    return this.http.get(`${this.apiUrl}/${id}/title`, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  updateDeckTitle(id: number, title: string): Observable<any> { // change the deck title
    return this.http.put<any>(`${this.apiUrl}/${id}/title`, { title }).pipe(
      catchError(this.handleError)
    );
  }
  getDecks(): Observable<any> { // fetch all decks
    console.log('Sending request to:', this.apiUrl);
    return this.http.get<any>(this.apiUrl).pipe(
      tap(decks => console.log('Received response:', decks)),
      catchError(this.handleError)
    );
  }

  getDeck(id: number): Observable<any> { // fetch a deck
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addDeck(title: string): Observable<any> { // add a new deck
    return this.http.post<any>(this.apiUrl, { title: title, flashcards: [], scores: { hard: 0, good: 0 ,easy: 0,} }).pipe(
      catchError(this.handleError)
    );
  }

  removeDeck(id: number): Observable<any> {   // remove a deck
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addFlashcard(deckId: number, flashcard: any): Observable<any> { // add a flashcard to a deck
    return this.http.post<any>(`${this.apiUrl}/${deckId}/flashcards`, flashcard).pipe(
      catchError(this.handleError)
    );
  }

  removeFlashcard(deckId: number, flashcardId: number): Observable<any> { // remove a flashcard from a deck
    return this.http.delete<any>(`${this.apiUrl}/${deckId}/flashcards/${flashcardId}`).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) { // Display a message when an error occurs
    console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    return throwError('Something wrong happened; please try again later.');
  }
}
