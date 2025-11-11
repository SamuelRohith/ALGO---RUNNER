// Core game types and interfaces - backend-ready
export interface GameState {
  isRunning: boolean
  isPaused: boolean
  score: number
  coinsCollected: number
  distanceTraveled: number
  speedMultiplier: number
  timeElapsed: number
}

export interface PlayerState {
  x: number
  y: number
  velocityY: number
  isJumping: boolean
  isGrounded: boolean
  width: number
  height: number
  animationFrame: number
  animationCounter: number
}

export interface GameObject {
  id: string
  x: number
  y: number
  width: number
  height: number
  type: "coin" | "bomb"
  collected?: boolean
}

export interface GameConfig {
  canvasWidth: number
  canvasHeight: number
  groundY: number
  gravity: number
  jumpPower: number
  gameSpeed: number
  initialGameSpeed: number
  maxGameSpeed: number
  speedIncrement: number
  coinSpawnRate: number
  bombSpawnRate: number
}
