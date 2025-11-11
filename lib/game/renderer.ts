// Rendering logic - separated from game logic for clarity
import type { PlayerState, GameObject, GameState } from "@/lib/types/game"
import { SPRITES, COLORS, GAME_CONFIG } from "@/lib/config/game-config"

export class GameRenderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private spriteCache: Map<string, HTMLImageElement> = new Map()
  private spritesLoaded = false

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")!
    this.preloadSprites()
  }

  private preloadSprites(): void {
    Object.entries(SPRITES).forEach(([key, url]) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = url
      img.onload = () => {
        this.spriteCache.set(key, img)
        this.spritesLoaded = Object.keys(SPRITES).length === this.spriteCache.size
      }
    })
  }

  clear(): void {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, GAME_CONFIG.canvasHeight)
    gradient.addColorStop(0, COLORS.darkPurple)
    gradient.addColorStop(1, COLORS.background)
    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight)

    // Ground line
    this.ctx.strokeStyle = COLORS.groundLine
    this.ctx.lineWidth = 20
    this.ctx.beginPath()
    this.ctx.moveTo(0, GAME_CONFIG.groundY)
    this.ctx.lineTo(GAME_CONFIG.canvasWidth, GAME_CONFIG.groundY)
    this.ctx.stroke()
  }

  renderPlayer(player: PlayerState): void {
    let spriteKey = "idle"

    if (player.isJumping && player.velocityY < 0) {
      spriteKey = "jump"
    } else if (!player.isGrounded && player.velocityY > 0) {
      spriteKey = "land"
    } else if (!player.isJumping && player.isGrounded) {
      // Running animation cycle
      const frameIndex = player.animationFrame % 4
      if (frameIndex === 0) spriteKey = "runLeft1"
      else if (frameIndex === 1) spriteKey = "runLeft2"
      else if (frameIndex === 2) spriteKey = "run2"
      else spriteKey = "run21"
    }

    const sprite = this.spriteCache.get(spriteKey)
    if (sprite && this.spritesLoaded) {
      this.ctx.drawImage(sprite, player.x, player.y, player.width, player.height)
    } else {
      // Fallback - simple rectangle
      this.ctx.fillStyle = COLORS.lightPurple
      this.ctx.fillRect(player.x, player.y, player.width, player.height)
    }
  }

  renderGameObjects(objects: GameObject[]): void {
    objects.forEach((obj) => {
      if (obj.collected) return

      if (obj.type === "coin") {
        this.ctx.fillStyle = COLORS.coin
        this.ctx.beginPath()
        this.ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, 0, Math.PI * 2)
        this.ctx.fill()
      } else if (obj.type === "bomb") {
        this.ctx.fillStyle = COLORS.bomb
        this.ctx.beginPath()
        this.ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, 0, Math.PI * 2)
        this.ctx.fill()
      }
    })
  }

  renderUI(gameState: GameState, gameSpeed: number): void {
    this.ctx.fillStyle = COLORS.white
    this.ctx.font = "bold 36px Arial"

    this.ctx.textAlign = "left"
    this.ctx.fillText(`Score: ${gameState.score}`, 30, 50)
    this.ctx.fillText(`Coins: ${gameState.coinsCollected}`, 30, 100)

    this.ctx.textAlign = "right"
    this.ctx.fillText(`Speed: ${gameSpeed.toFixed(1)}x`, GAME_CONFIG.canvasWidth - 30, 50)

    this.ctx.textAlign = "left"
    this.ctx.font = "20px Arial"
    this.ctx.fillText("SPACE to jump | R to restart", 30, GAME_CONFIG.canvasHeight - 30)
  }

  renderGameOver(finalScore: number): void {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    this.ctx.fillRect(0, 0, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight)

    this.ctx.fillStyle = COLORS.white
    this.ctx.font = "bold 80px Arial"
    this.ctx.textAlign = "center"
    this.ctx.fillText("GAME OVER", GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2 - 100)

    this.ctx.font = "40px Arial"
    this.ctx.fillText(`Final Score: ${finalScore}`, GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2 + 50)
    this.ctx.fillText("Press R to Restart", GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2 + 130)
  }
}
