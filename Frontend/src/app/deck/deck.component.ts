import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecksService } from '../decks.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
})
export class DeckComponent implements OnInit {
  deck: any;
  newFlashcard = { question: '', answer: '' };

  constructor(private route: ActivatedRoute, private decksService: DecksService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.decksService.getDeck(id).subscribe(deck => {
      console.log('Fetched deck:', deck); // log fetched deck
      this.deck = deck;
    });
  }

  addFlashcard() {
    this.decksService.addFlashcard(this.deck.id, this.newFlashcard).subscribe((flashcard: any) => {
      this.deck.flashcards.push(flashcard);
      this.newFlashcard = { question: '', answer: '' };
    });
  }

  removeFlashcard(id: number) {
    this.decksService.removeFlashcard(this.deck.id, id).subscribe(() => {
      this.deck.flashcards = this.deck.flashcards.filter((flashcard: { id: number; }) => flashcard.id !== id);
    });
  }
}
