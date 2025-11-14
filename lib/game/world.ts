// World/Level management - handles game objects and spawning
import type { GameObject } from "@/lib/types/game"
import { GAME_CONFIG } from "@/lib/config/game-config"

export class World {
  gameObjects: GameObject[] = []
  nextId = 0
  coinSpawnCounter = 0
  bombSpawnCounter = 0

  update(): void {
    this.coinSpawnCounter++
    this.bombSpawnCounter++

    if (this.coinSpawnCounter >= GAME_CONFIG.coinSpawnRate) {
      this.spawnCoin()
      this.coinSpawnCounter = 0
    }

    if (this.bombSpawnCounter >= GAME_CONFIG.bombSpawnRate) {
      this.spawnBomb()
      this.bombSpawnCounter = 0
    }

    // Move objects and remove off-screen items
    this.gameObjects = this.gameObjects.filter((obj) => {
      obj.x -= GAME_CONFIG.gameSpeed
      return obj.x + obj.width > 0
    })
  }

  private spawnCoin(): void {
    const minY = 300
    const maxY = 700
    this.gameObjects.push({
      id: `coin-${this.nextId++}`,
      x: GAME_CONFIG.canvasWidth,
      y: Math.random() * (maxY - minY) + minY,
      width: 30,
      height: 30,
      type: "coin",
    })
  }

  private spawnBomb(): void {
    this.gameObjects.push({
      id: `bomb-${this.nextId++}`,
      x: GAME_CONFIG.canvasWidth,
      y: GAME_CONFIG.groundY + 20,
      width: 40,
      height: 40,
      type: "bomb",
    })
  }

  collectObject(id: string): boolean {
    const obj = this.gameObjects.find((o) => o.id === id)
    if (obj && !obj.collected) {
      obj.collected = true
      return true
    }
    return false
  }

  reset(): void {
    this.gameObjects = []
    this.coinSpawnCounter = 0
    this.bombSpawnCounter = 0
    this.nextId = 0
  }
}
