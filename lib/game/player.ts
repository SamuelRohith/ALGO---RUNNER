// Player class - handles player logic separately from rendering
import type { PlayerState } from "@/lib/types/game"
import { GAME_CONFIG } from "@/lib/config/game-config"

export class Player {
  state: PlayerState
  landingCounter = 0

  constructor(x = 50) {
    this.state = {
      x,
      y: GAME_CONFIG.groundY,
      velocityY: 0,
      isJumping: false,
      isGrounded: true,
      width: 80,
      height: 120,
      animationFrame: 0,
      animationCounter: 0,
    }
  }

  update(): void {
    this.state.velocityY += GAME_CONFIG.gravity
    this.state.y += this.state.velocityY

    // Ground collision
    if (this.state.y >= GAME_CONFIG.groundY) {
      this.state.y = GAME_CONFIG.groundY
      this.state.velocityY = 0
      this.state.isJumping = false
      this.state.isGrounded = true
      this.landingCounter = 10
    } else {
      this.state.isGrounded = false
    }

    // Landing animation
    if (this.landingCounter > 0) {
      this.landingCounter--
    }

    this.state.animationCounter++
    if (this.state.animationCounter >= 8) {
      this.state.animationCounter = 0
      this.state.animationFrame = (this.state.animationFrame + 1) % 4
    }
  }

  jump(): void {
    if (this.state.isGrounded) {
      this.state.velocityY = GAME_CONFIG.jumpPower
      this.state.isJumping = true
      this.state.isGrounded = false
    }
  }

  getBounds() {
    return {
      x: this.state.x,
      y: this.state.y,
      width: this.state.width,
      height: this.state.height,
    }
  }
}
