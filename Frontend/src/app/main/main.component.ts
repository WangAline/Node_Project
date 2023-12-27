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
  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit(): void {
    this.flashcardsService.getFlashcards(1).subscribe(flashcards => {
      this.flashcards = flashcards;
      this.currentFlashcard = this.flashcards[this.currentCardIndex];
    });
    this.flashcardsService.getScores(1).subscribe(scores => {
      this.scores = scores;
    });
  }

  nextCard(): void {
    this.currentCardIndex++;
    if (this.currentCardIndex < this.flashcards.length) {
      this.currentFlashcard = this.flashcards[this.currentCardIndex];
    } else {
      console.log('No more cards in this deck');
    }
  }

  onAnswer(): void {
    this.showAnswer = true;
  }

  onScore(score: number): void {
    if (score === 0) {
      this.scores.again++;
    } else if (score === 1) {
      this.scores.hard++;
    } else if (score === 2) {
      this.scores.good++;
    }
    this.flashcardsService.updateScores(1, this.scores).subscribe(updatedScores => {
      console.log('Scores updated:', updatedScores);
    });
    this.showAnswer = false;
    this.nextCard();
  }
}
