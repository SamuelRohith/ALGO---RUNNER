// Collision detection - separated for easy testing and backend validation
import type { PlayerState, GameObject } from "@/lib/types/game"

export interface CollisionResult {
  type: "coin" | "bomb" | "none"
  objectId?: string
}

export function checkPlayerObjectCollision(player: PlayerState, objects: GameObject[]): CollisionResult {
  const playerBounds = {
    x: player.x,
    y: player.y,
    width: player.width,
    height: player.height,
  }

  for (const obj of objects) {
    if (obj.collected) continue

    if (
      playerBounds.x < obj.x + obj.width &&
      playerBounds.x + playerBounds.width > obj.x &&
      playerBounds.y < obj.y + obj.height &&
      playerBounds.y + playerBounds.height > obj.y
    ) {
      return {
        type: obj.type,
        objectId: obj.id,
      }
    }
  }

  return { type: "none" }
}
