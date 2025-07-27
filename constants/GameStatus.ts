import { LOST, PLAYING, WON } from "@/components/game/GameStatus";

export const GAME_STATUS = {
  PLAYING,
  WON,
  LOST,
} as const;

export type GameStatus = GetValues<typeof GAME_STATUS>;