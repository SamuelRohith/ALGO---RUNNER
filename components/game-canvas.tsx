// Game canvas component - handles rendering
"use client"

import { useEffect, useRef } from "react"
import { GameRenderer } from "@/lib/game/renderer"
import type { PlayerState, GameObject, GameState } from "@/lib/types/game"

interface GameCanvasProps {
  playerState: PlayerState
  gameObjects: GameObject[]
  gameState: GameState
  gameSpeed: number
  isGameOver: boolean
}

export function GameCanvas({ playerState, gameObjects, gameState, gameSpeed, isGameOver }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<GameRenderer | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    if (!rendererRef.current) {
      rendererRef.current = new GameRenderer(canvasRef.current)
    }

    const renderer = rendererRef.current
    renderer.clear()
    renderer.renderPlayer(playerState)
    renderer.renderGameObjects(gameObjects)
    renderer.renderUI(gameState, gameSpeed)

    if (isGameOver) {
      renderer.renderGameOver(gameState.score)
    }
  }, [playerState, gameObjects, gameState, gameSpeed, isGameOver])

  return <canvas ref={canvasRef} width={1920} height={1080} className="w-full h-screen bg-black" />
}
