import type { GameObject, Player, Coin, Obstacle, InputState, GameConfig } from "./types"
import { DEFAULT_GAME_CONFIG } from "./game-config"

export class GameEngine {
  private config: GameConfig
  private player: Player
  private coins: Coin[] = []
  private obstacles: Obstacle[] = []
  private score = 0
  private gameOver = false
  private _isRunning = true
  private frameCount = 0
  private coinSpawnCounter = 0
  private obstacleSpawnCounter = 0
  private currentSpeed = 3
  private maxSpeed = 8
  private gravity = 0.6
  private jumpPower = -15
  private runningAnimationFrame = 0 // added running animation frame counter

  constructor(config: Partial<GameConfig> = {}) {
    this.config = { ...DEFAULT_GAME_CONFIG, ...config }
    this.player = this.createPlayer()
  }

  private createPlayer(): Player {
    return {
      id: "player",
      type: "player",
      x: 50,
      y: this.config.groundLevel - 40,
      width: 20,
      height: 40,
      velocityY: 0,
      isJumping: false,
      isGrounded: true,
      currentPlatformId: null,
      playerState: "idle",
      landingCounter: 0,
      runAnimationIndex: 0, // added running animation index
    }
  }

  private createCoin(x: number): Coin {
    const coin: Coin = {
      id: `coin-${Date.now()}-${Math.random()}`,
      type: "coin",
      x,
      y: Math.random() * (this.config.groundLevel - 150) + 50,
      width: 15,
      height: 15,
      collected: false,
      speed: this.currentSpeed,
    }
    this.coins.push(coin)
    return coin
  }

  private createObstacle(x: number): Obstacle {
    const obstacle: Obstacle = {
      id: `obstacle-${Date.now()}-${Math.random()}`,
      type: "obstacle",
      x,
      y: this.config.groundLevel - 25,
      width: 25,
      height: 25,
      speed: this.currentSpeed,
      obstacleType: "bomb",
    }
    this.obstacles.push(obstacle)
    return obstacle
  }

  update(input: InputState) {
    if (this.gameOver) return

    this.frameCount++

    if (this.frameCount % 500 === 0 && this.currentSpeed < this.maxSpeed) {
      this.currentSpeed += 0.5
    }

    this.updatePlayer(input)

    if (this.player.playerState === "running") {
      this.runningAnimationFrame++
      if (this.runningAnimationFrame % 8 === 0) {
        this.player.runAnimationIndex = (this.player.runAnimationIndex + 1) % 4
      }
    } else {
      this.runningAnimationFrame = 0
      this.player.runAnimationIndex = 0
    }

    this.updateCoins()

    this.updateObstacles()

    this.coinSpawnCounter++
    if (this.coinSpawnCounter > 100) {
      this.createCoin(this.config.canvasWidth)
      this.coinSpawnCounter = 0
    }

    this.obstacleSpawnCounter++
    if (this.obstacleSpawnCounter > 150) {
      this.createObstacle(this.config.canvasWidth)
      this.obstacleSpawnCounter = 0
    }

    this.checkCollisions()
  }

  private updatePlayer(input: InputState) {
    if (this.player.landingCounter > 0) {
      this.player.landingCounter--
      if (this.player.landingCounter === 0) {
        this.player.playerState = "running"
      }
    }

    if (input.jump && this.player.isGrounded) {
      this.player.velocityY = this.jumpPower
      this.player.isGrounded = false
      this.player.isJumping = true
      this.player.playerState = "jumping"
    }

    // Apply gravity
    this.player.velocityY += this.gravity
    this.player.y += this.player.velocityY

    // Ground collision
    if (this.player.y + this.player.height >= this.config.groundLevel) {
      this.player.y = this.config.groundLevel - this.player.height
      this.player.velocityY = 0
      this.player.isGrounded = true
      this.player.isJumping = false
      if (this.player.playerState === "jumping") {
        this.player.playerState = "landing"
        this.player.landingCounter = 5
      }
    }
  }

  private updateCoins() {
    for (let i = this.coins.length - 1; i >= 0; i--) {
      this.coins[i].x -= this.coins[i].speed

      if (this.coins[i].x + this.coins[i].width < 0) {
        this.coins.splice(i, 1)
      }
    }
  }

  private updateObstacles() {
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      this.obstacles[i].x -= this.obstacles[i].speed

      if (this.obstacles[i].x + this.obstacles[i].width < 0) {
        this.obstacles.splice(i, 1)
      }
    }
  }

  private checkCollisions() {
    // Check coin collection
    for (let i = this.coins.length - 1; i >= 0; i--) {
      if (this.checkAABBCollision(this.player, this.coins[i])) {
        this.score += 10
        this.coins.splice(i, 1)
      }
    }

    // Check obstacle collision
    for (const obstacle of this.obstacles) {
      if (this.checkAABBCollision(this.player, obstacle)) {
        this.gameOver = true
      }
    }
  }

  private checkAABBCollision(a: GameObject, b: GameObject): boolean {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
  }

  getGameObjects(): GameObject[] {
    return [this.player, ...this.coins, ...this.obstacles]
  }

  getScore(): number {
    return this.score
  }

  getCurrentSpeed(): number {
    return Math.round(this.currentSpeed * 10) / 10
  }

  isGameOver(): boolean {
    return this.gameOver
  }

  isRunning(): boolean {
    return this._isRunning
  }

  restart() {
    this.player = this.createPlayer()
    this.coins = []
    this.obstacles = []
    this.score = 0
    this.gameOver = false
    this.frameCount = 0
    this.coinSpawnCounter = 0
    this.obstacleSpawnCounter = 0
    this.currentSpeed = 3
    this.player.landingCounter = 0
    this.runningAnimationFrame = 0 // reset running animation frame counter
  }
}
