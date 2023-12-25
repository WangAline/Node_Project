import { Component, OnInit } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  flashcards: any[] = [];
  currentFlashcard: any;
  showAnswer: boolean = false;
  deckId: number = 1; // assuming deck id 1 for now

  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit(): void {
    this.flashcardsService.getFlashcards(this.deckId).subscribe(flashcards => {
      this.flashcards = flashcards;
      this.currentFlashcard = this.flashcards[0]; // start with the first flashcard
    });
  }

  onAnswer() {
    this.showAnswer = true;
  }

  onScore(score: number) {
    this.flashcardsService.updateScore(this.deckId, this.currentFlashcard.id, score).subscribe(() => {
      this.showAnswer = false;
      const index = this.flashcards.indexOf(this.currentFlashcard);
      this.currentFlashcard = this.flashcards[index + 1]; // move to the next flashcard
    });
  }
}
