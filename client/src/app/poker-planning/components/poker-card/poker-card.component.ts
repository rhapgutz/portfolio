import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokerCard } from '../../models/poker-card';

@Component({
  selector: 'poker-card',
  templateUrl: './poker-card.component.html',
  styleUrl: './poker-card.component.scss'
})
export class PokerCardComponent implements OnInit {

  @Input()
  canSelect: boolean;

  @Input()
  data: PokerCard;

  @Output()
  selectedCardEvent = new EventEmitter<PokerCard>(null);

  @Input()
  revealCards: boolean;

  constructor() {

  }

  ngOnInit(): void {
    
  }

  onSelectedCard(): void {
    if (this.canSelect) {
      this.selectedCardEvent.emit(this.data);
    }
  }

  getCardValue(): string|number {
    if (!this.canSelect && !this.revealCards) {
      return "?";
    }

    return this.data.value;
  }

  getUserInitial(): string {
    return `${this.data.user?.firstName.charAt(0)}${this.data.user?.lastName.charAt(0)}`
  }
}
