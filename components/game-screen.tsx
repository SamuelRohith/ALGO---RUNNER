"use client"

import { useEffect, useRef, useState } from "react"
import { GameEngine } from "@/lib/game-engine"
import { GameRenderer } from "@/lib/game-renderer"
import { InputController } from "@/lib/input-controller"
import type { GameState } from "@/lib/types"

interface GameScreenProps {
  onBackToMenu: () => void
  stickmanColor: string
}

export default function GameScreen({ onBackToMenu, stickmanColor }: GameScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    gameOver: false,
    isRunning: true,
  })
  const [speed, setSpeed] = useState(1)
  const gameEngineRef = useRef<GameEngine | null>(null)
  const rendererRef = useRef<GameRenderer | null>(null)
  const inputControllerRef = useRef<InputController | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gameEngine = new GameEngine()
    const renderer = new GameRenderer(canvas, stickmanColor)
    const inputController = new InputController()

    gameEngineRef.current = gameEngine
    rendererRef.current = renderer
    inputControllerRef.current = inputController

    const gameLoop = () => {
      gameEngine.update(inputController.getInput())

      renderer.render(gameEngine.getGameObjects(), gameEngine.getScore(), gameEngine.getCurrentSpeed())

      setGameState({
        score: gameEngine.getScore(),
        gameOver: gameEngine.isGameOver(),
        isRunning: gameEngine.isRunning(),
      })
      setSpeed(gameEngine.getCurrentSpeed())

      if (gameEngine.isGameOver() && inputController.isRestartPressed()) {
        gameEngine.restart()
        inputController.clearRestartFlag()
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      inputController.destroy()
    }
  }, [stickmanColor])

  return (
    <div
      className="w-full max-w-4xl mx-auto p-4"
      style={{ background: "linear-gradient(135deg, #2d1b4e 0%, #1a0f2e 100%)" }}
    >
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Stickman Runner</h1>
        <p className="text-lg text-purple-200">
          {gameState.gameOver ? "Game Over! Press R to restart" : "Dodge bombs and collect coins!"}
        </p>
      </div>

      <div
        className="relative bg-white rounded-lg shadow-2xl overflow-hidden border-4"
        style={{ borderColor: "#6d28d9" }}
      >
        <canvas ref={canvasRef} width={1000} height={600} className="w-full block" />
      </div>

      <div className="mt-6 text-center">
        <div className="text-3xl font-bold text-white">Score: {gameState.score}</div>
        <div className="text-2xl font-semibold text-purple-200 mt-2">Speed: {speed.toFixed(1)}x</div>
        <div className="mt-4 text-sm text-purple-300">
          <p>LEFT/RIGHT Arrows - Move | R - Restart</p>
        </div>
      </div>

      <button
        onClick={onBackToMenu}
        className="mt-6 w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg hover:from-purple-700 hover:to-purple-800 transition shadow-lg"
      >
        Back to Menu
      </button>
    </div>
  )
}
