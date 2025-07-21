type Suit = "Diamond" | "Heart" | "Club" | "Spade";
type Rank = number;

class Card {
  suit: Suit;
  rank: Rank;

  constructor(suit: Suit, rank: Rank) {
    this.suit = suit;
    this.rank = rank;
  }
}
