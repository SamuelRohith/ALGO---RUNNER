// Game object types
export interface GameObject {
  x: number
  y: number
  width: number
  height: number
  type: "player" | "platform" | "coin" | "obstacle"
  id: string
}

export interface Player extends GameObject {
  type: "player"
  velocityY: number
  isJumping: boolean
  isGrounded: boolean
  currentPlatformId: string | null // track which platform player is on
  playerState: "running" | "jumping" | "landing" | "idle" // add state for sprite selection
  landingCounter: number // frames to show landing pose
  runAnimationIndex?: number // added running animation frame index
}

export interface Platform extends GameObject {
  type: "platform"
  speed: number
  height: number // platform elevation level
}

export interface Coin extends GameObject {
  type: "coin"
  collected: boolean
  speed: number
}

export interface Obstacle extends GameObject {
  type: "obstacle"
  speed: number
  obstacleType: "spike" | "saw" | "bomb" // different obstacle types
}

// Input state
export interface InputState {
  jump: boolean
  drop: boolean // drop down from platform
  restart: boolean
}

// Game state
export interface GameState {
  score: number
  gameOver: boolean
  isRunning: boolean
}

// Game config
export interface GameConfig {
  canvasWidth: number
  canvasHeight: number
  gravity: number
  jumpForce: number
  playerSpeed: number
  platformSpeed: number
  groundLevel: number
}
