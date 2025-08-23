import { Rect } from "../visuals/nodes/canvas_item.js";
import { Vector2 } from "../visuals/utlis.js";

export type Suit = "Spade" | "Heart" | "Diamond" | "Club";
export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

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

export const STAGGER_DISTANCE = new Vector2(35, 30);
export const TILE_SIZE = new Vector2(90, 130);
export const CARD_SIZE = new Vector2(80, 120);
export const CANVAS_SIZE = new Vector2(810, 650);
export const DEFAULT_GRID_NUM_LINES = 10;

export const CARD_RECT: Rect = {
  size: CARD_SIZE,
  border_width: 2,
  corner_radius: 5,
};

export const SUIT_CARD_TEXTURE_MAP: Record<Suit, Record<Rank, string>> = {
  Spade: {
    2: "visuals/images/2_of_spades.png",
    3: "visuals/images/3_of_spades.png",
    4: "visuals/images/4_of_spades.png",
    5: "visuals/images/5_of_spades.png",
    6: "visuals/images/6_of_spades.png",
    7: "visuals/images/7_of_spades.png",
    8: "visuals/images/8_of_spades.png",
    9: "visuals/images/9_of_spades.png",
    10: "visuals/images/10_of_spades.png",
    J: "visuals/images/jack_of_spades2.png",
    Q: "visuals/images/queen_of_spades2.png",
    K: "visuals/images/king_of_spades2.png",
    A: "visuals/images/ace_of_spades2.png",
  },
  Heart: {
    2: "visuals/images/2_of_hearts.png",
    3: "visuals/images/3_of_hearts.png",
    4: "visuals/images/4_of_hearts.png",
    5: "visuals/images/5_of_hearts.png",
    6: "visuals/images/6_of_hearts.png",
    7: "visuals/images/7_of_hearts.png",
    8: "visuals/images/8_of_hearts.png",
    9: "visuals/images/9_of_hearts.png",
    10: "visuals/images/10_of_hearts.png",
    J: "visuals/images/jack_of_hearts2.png",
    Q: "visuals/images/queen_of_hearts2.png",
    K: "visuals/images/king_of_hearts2.png",
    A: "visuals/images/ace_of_hearts.png",
  },
  Diamond: {
    2: "visuals/images/2_of_diamonds.png",
    3: "visuals/images/3_of_diamonds.png",
    4: "visuals/images/4_of_diamonds.png",
    5: "visuals/images/5_of_diamonds.png",
    6: "visuals/images/6_of_diamonds.png",
    7: "visuals/images/7_of_diamonds.png",
    8: "visuals/images/8_of_diamonds.png",
    9: "visuals/images/9_of_diamonds.png",
    10: "visuals/images/10_of_diamonds.png",
    J: "visuals/images/jack_of_diamonds2.png",
    Q: "visuals/images/queen_of_diamonds2.png",
    K: "visuals/images/king_of_diamonds2.png",
    A: "visuals/images/ace_of_diamonds.png",
  },
  Club: {
    2: "visuals/images/2_of_clubs.png",
    3: "visuals/images/3_of_clubs.png",
    4: "visuals/images/4_of_clubs.png",
    5: "visuals/images/5_of_clubs.png",
    6: "visuals/images/6_of_clubs.png",
    7: "visuals/images/7_of_clubs.png",
    8: "visuals/images/8_of_clubs.png",
    9: "visuals/images/9_of_clubs.png",
    10: "visuals/images/10_of_clubs.png",
    J: "visuals/images/jack_of_clubs2.png",
    Q: "visuals/images/queen_of_clubs2.png",
    K: "visuals/images/king_of_clubs2.png",
    A: "visuals/images/ace_of_clubs.png",
  },
};
