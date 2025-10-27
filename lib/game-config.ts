import type { GameConfig } from "./types"

export const DEFAULT_GAME_CONFIG: GameConfig = {
  canvasWidth: 1000,
  canvasHeight: 600,
  gravity: 0.6,
  jumpForce: 15,
  playerSpeed: 5,
  platformSpeed: 3, // reduced initial platform speed for slower gameplay
  groundLevel: 560,
}
