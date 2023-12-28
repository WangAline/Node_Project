import { Component, OnInit } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  currentFlashcard: any;
  currentCardIndex: number = 0;
  flashcards: any[] = [];
  showAnswer: boolean = false;
  scores: any;
  title: string = '';
  decks: any[] = [];
  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit(): void {
    this.flashcardsService.getDecks().subscribe(decks => { // fetch the decks
      this.decks = decks;
      if (this.decks.length > 0) {
        this.loadDeck(this.decks[0].id); // load the first deck
      }
    });

  }
  onDeckChange(deckId: number): void {
    this.loadDeck(deckId); // load the selected deck when the user clicks on the deck button
  }

  onAnswer(): void {
    this.showAnswer = true; //display the answer when the user clicks on the "Show Answer" button
  }

  isDeckFinished = false;
  nextCard(): void {
    if (this.currentCardIndex < this.flashcards.length - 1) {
      this.currentCardIndex++; // move to the next card index
      this.currentFlashcard = this.flashcards[this.currentCardIndex];
    } else {
      this.isDeckFinished = true; // if the deck is finished, display the "End of the Deck" message
    }
  }

  onScore(score: number): void { // update the scores and move to the next card when one of the "Hard", "Good", or "Easy" buttons is clicked
    if (!this.isDeckFinished) {
      if (score === 0) { // If "Again" is clicked we don't increment any score and don't move to the next card
      } else if (score === 1) {
        this.scores.hard++;
        this.nextCard();
      } else if (score === 2) {
        this.scores.good++;
        this.nextCard();
      } else if (score === 3) {
        this.scores.easy++;
        this.nextCard();
      }
      this.flashcardsService.updateScores(1, this.scores).subscribe(updatedScores => {
        console.log('Scores updated:', updatedScores);
      });
      this.showAnswer = false;
    }
  }
  updateTitle(newTitle: string): void { //feature to update the deck title
    this.flashcardsService.updateDeckTitle(1, newTitle).subscribe(updatedTitle => { // update the deck title
      this.title = updatedTitle;
    });
  }
  loadDeck(deckId: number): void {
    this.isDeckFinished = false;
    this.currentCardIndex = 0;
    this.flashcardsService.getFlashcards(deckId).subscribe(flashcards => {
      this.flashcards = flashcards;
      this.currentFlashcard = this.flashcards[this.currentCardIndex];
    });
    this.flashcardsService.getScores(deckId).subscribe(scores => {
      this.scores = scores;
    });
    this.flashcardsService.getDeckTitle(deckId).subscribe(title => {
      this.title = title;
    });
  }

  previousCard(): void {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
      this.currentFlashcard = this.flashcards[this.currentCardIndex];
    }
  }
}
