import { Component, OnInit } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
})
export class DecksComponent implements OnInit {
  decks: any[] = [];
  newDeckTitle = '';


  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit(): void {
    this.flashcardsService.getDecks().subscribe(decks => {
      console.log('Fetched decks:', decks); // log fetched decks
      this.decks = decks;
    });
  }

  addDeck() {
    if (this.newDeckTitle.trim()) {
      this.flashcardsService.addDeck(this.newDeckTitle).subscribe((deck: any) => {
        this.decks.push(deck);
        this.newDeckTitle = '';
      });
    }
  }

  removeDeck(id: number) {
    this.flashcardsService.removeDeck(id).subscribe(() => {
      this.decks = this.decks.filter(deck => deck.id !== id);
    });
  }
}
