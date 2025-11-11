import type { GameObject, Player, Coin, Obstacle } from "./types"

export class GameRenderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private stickmanColor: string
  private spriteCache: Record<string, HTMLImageElement | null> = {
    idle: null,
    runLeft: null,
    runLeft2: null,
    runMid: null,
    runMid2: null,
    runRight: null,
    runRight2: null,
    jumping: null,
    landing: null,
  }
  private spritesLoaded = false

  constructor(canvas: HTMLCanvasElement, stickmanColor = "blue") {
    this.canvas = canvas
    this.stickmanColor = stickmanColor
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Could not get canvas context")
    this.ctx = ctx
    this.preloadSprites()
  }

  private preloadSprites() {
    const spriteUrls = {
      idle: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/StandingSillPose-5khuXv4VelU1GcAilqEbG3QPUk8Nmd.png",
      runLeft:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LeftRunningPose-Ktd4AptwzczmxleBgWnrm22Rp7YVtA.png",
      runLeft2:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LeftRunningPose2-q6aXTjHUy15OnENqALgtDjvkwKqZQR.png",
      runMid: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RunPose2-TZ7SFpciXEsrjSHC4KZVaj66xmjX4Z.png",
      runMid2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Runpose21-xtFhLWf3qbtrLANRBYCLLNZB6rEOK2.png",
      runRight:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RightRunningPose-1mu0pXw7rjj5C81W7GMV4JBfpYgMW5.png",
      runRight2:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RightRunningPose2.png-ibeOdO1KkrJU1FwJoqidOiZjUpeFjZ.jpeg",
      jumping: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/JumpPose-hq7v9oViyCM3xU93XuwjyeDy0eXwdw.png",
      landing:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AfterJumpLandingPose-AfeEcCTI9RwrNBQTeqSP3KEnF6Z3Xd.png",
    }

    Object.entries(spriteUrls).forEach(([key, url]) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        this.spriteCache[key] = img
        this.spritesLoaded = Object.values(this.spriteCache).every((sprite) => sprite !== null)
      }
      img.onerror = () => {
        console.log("[v0] Failed to load sprite:", key)
      }
      img.src = url
    })
  }

  render(gameObjects: GameObject[], score: number, speed: number) {
    const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height)
    skyGradient.addColorStop(0, "#2d1b4e")
    skyGradient.addColorStop(1, "#1a0f2e")
    this.ctx.fillStyle = skyGradient
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Ground
    this.ctx.fillStyle = "#3d2563"
    this.ctx.fillRect(0, 560, this.canvas.width, 40)

    // Ground accent line
    this.ctx.fillStyle = "#6d28d9"
    this.ctx.fillRect(0, 560, this.canvas.width, 4)

    // Draw game objects
    for (const obj of gameObjects) {
      this.drawGameObject(obj)
    }

    this.ctx.fillStyle = "#ffffff"
    this.ctx.font = "bold 28px Arial"
    this.ctx.fillText(`Score: ${score}`, 20, 45)

    this.ctx.font = "bold 20px Arial"
    this.ctx.fillStyle = "#e9d5ff"
    this.ctx.fillText(`Speed: ${speed.toFixed(1)}x`, 20, 75)

    this.ctx.font = "14px Arial"
    this.ctx.fillStyle = "#d8b4fe"
    this.ctx.fillText("SPACE: Jump | R: Restart", 20, 100)
  }

  private drawGameObject(obj: GameObject) {
    switch (obj.type) {
      case "player":
        this.drawPlayer(obj as Player)
        break
      case "coin":
        this.drawCoin(obj as Coin)
        break
      case "obstacle":
        this.drawObstacle(obj as Obstacle)
        break
    }
  }

  private drawPlayer(player: Player) {
    if (this.spritesLoaded) {
      this.drawPlayerSprite(player)
    } else {
      this.drawPlayerProcedural(player)
    }
  }

  private drawPlayerSprite(player: Player) {
    let sprite: HTMLImageElement | null = null
    const runningFrames = [
      this.spriteCache.runLeft,
      this.spriteCache.runLeft2,
      this.spriteCache.runMid,
      this.spriteCache.runMid2,
    ]

    switch (player.playerState) {
      case "idle":
        sprite = this.spriteCache.idle
        break
      case "running":
        sprite = runningFrames[player.runAnimationIndex || 0]
        break
      case "jumping":
        sprite = this.spriteCache.jumping
        break
      case "landing":
        sprite = this.spriteCache.landing
        break
    }

    if (sprite) {
      this.ctx.drawImage(sprite, player.x - 15, player.y - 20, 60, 80)
    }
  }

  private drawPlayerProcedural(player: Player) {
    const colorMap: Record<string, string> = {
      yellow: "#fbbf24",
      red: "#ef4444",
      blue: "#0ea5e9",
      green: "#22c55e",
      purple: "#a855f7",
      pink: "#ec4899",
    }
    const headColor = colorMap[this.stickmanColor] || "#0ea5e9"

    const centerX = player.x + player.width / 2
    const centerY = player.y + 8

    // Head
    this.ctx.fillStyle = headColor
    this.ctx.beginPath()
    this.ctx.arc(centerX, centerY, 6, 0, Math.PI * 2)
    this.ctx.fill()

    // Body
    this.ctx.strokeStyle = "#ffffff"
    this.ctx.lineWidth = 2.5
    this.ctx.beginPath()
    this.ctx.moveTo(centerX, centerY + 6)
    this.ctx.lineTo(centerX, centerY + 16)
    this.ctx.stroke()

    // Left arm
    this.ctx.beginPath()
    this.ctx.moveTo(centerX, centerY + 10)
    this.ctx.lineTo(centerX - 6, centerY + 6)
    this.ctx.stroke()

    // Right arm
    this.ctx.beginPath()
    this.ctx.moveTo(centerX, centerY + 10)
    this.ctx.lineTo(centerX + 6, centerY + 6)
    this.ctx.stroke()

    // Left leg
    this.ctx.beginPath()
    this.ctx.moveTo(centerX, centerY + 16)
    this.ctx.lineTo(centerX - 4, centerY + 26)
    this.ctx.stroke()

    // Right leg
    this.ctx.beginPath()
    this.ctx.moveTo(centerX, centerY + 16)
    this.ctx.lineTo(centerX + 4, centerY + 26)
    this.ctx.stroke()
  }

  private drawCoin(coin: Coin) {
    // Coin circle
    this.ctx.fillStyle = "#fbbf24"
    this.ctx.beginPath()
    this.ctx.arc(coin.x + coin.width / 2, coin.y + coin.height / 2, coin.width / 2, 0, Math.PI * 2)
    this.ctx.fill()

    // Coin border
    this.ctx.strokeStyle = "#d97706"
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    // Coin shine
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    this.ctx.beginPath()
    this.ctx.arc(coin.x + coin.width / 3, coin.y + coin.height / 3, coin.width / 4, 0, Math.PI * 2)
    this.ctx.fill()
  }

  private drawObstacle(obstacle: Obstacle) {
    this.ctx.fillStyle = "#1f2937"
    this.ctx.beginPath()
    this.ctx.arc(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2, obstacle.width / 2, 0, Math.PI * 2)
    this.ctx.fill()

    // Fuse
    this.ctx.strokeStyle = "#92400e"
    this.ctx.lineWidth = 2
    this.ctx.beginPath()
    this.ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y)
    this.ctx.quadraticCurveTo(
      obstacle.x + obstacle.width / 2 + 3,
      obstacle.y - 5,
      obstacle.x + obstacle.width / 2,
      obstacle.y - 8,
    )
    this.ctx.stroke()

    // Spark
    this.ctx.fillStyle = "#fbbf24"
    this.ctx.beginPath()
    this.ctx.arc(obstacle.x + obstacle.width / 2, obstacle.y - 8, 2, 0, Math.PI * 2)
    this.ctx.fill()
  }
}
