export type Suit = "Spade" | "Heart" | "Diamond" | "Club";
export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "J" | "Q" | "K" | "A";

export type RankOrder = Record<Rank, number>;
export type OnlyRankOrders = { [key: string]: RankOrder };
export const RankOrders: OnlyRankOrders = {
  ACE_HIGH: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  },
  ACE_LOW: {
    A: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
  },
};

export type SuitOrder = Record<Suit, number>;
export type OnlySuitOrders = { [key: string]: SuitOrder };
export const SuitOrders: OnlySuitOrders = {
  DEFAULT: {
    Spade: 1,
    Heart: 2,
    Diamond: 3,
    Club: 4,
  },
};

export type Order = { RankOrder: RankOrder; SuitOrder: SuitOrder };
export type OnlyOrders = { [key: string]: Order };
export const Orders: OnlyOrders = {
  DEFAULT: { RankOrder: RankOrders.ACE_HIGH, SuitOrder: SuitOrders.DEFAULT },
};

export const SuitEmojis: Record<Suit, string> = {
  Spade: "♠️",
  Heart: "♥️",
  Diamond: "♦️",
  Club: "♣️",
};
