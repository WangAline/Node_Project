import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardsService } from '../flashcards.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
})
export class DeckComponent implements OnInit {
  deck: any;
  newFlashcard = { question: '', answer: '' };

  constructor(private route: ActivatedRoute, private flashcardsService: FlashcardsService) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.flashcardsService.getDeck(id).subscribe(deck => {
      console.log('Fetched deck:', deck); // log fetched deck
      this.deck = deck;
    });
  }

  addFlashcard() { // add a new flashcard when the user clicks on the "Add" button
    this.flashcardsService.addFlashcard(this.deck.id, this.newFlashcard).subscribe((flashcard: any) => {
      this.deck.flashcards.push(flashcard);
      this.newFlashcard = { question: '', answer: '' };
    });
  }

  removeFlashcard(id: number) { // remove the flashcard when the user clicks on the "Remove" button
    this.flashcardsService.removeFlashcard(this.deck.id, id).subscribe(() => {
      this.deck.flashcards = this.deck.flashcards.filter((flashcard: { id: number; }) => flashcard.id !== id);
    });
  }
}
