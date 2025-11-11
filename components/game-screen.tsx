"use client"

import { useState, useEffect, useRef } from "react"
import { GameCanvas } from "@/components/game-canvas"
import { Player } from "@/lib/game/player"
import { World } from "@/lib/game/world"
import { InputHandler } from "@/lib/game/input-handler"
import { checkPlayerObjectCollision } from "@/lib/game/collision"
import { GAME_CONFIG } from "@/lib/config/game-config"
import type { GameState } from "@/lib/types/game"

interface GameScreenProps {
  onBackToMenu: () => void
}

export default function GameScreen({ onBackToMenu }: GameScreenProps) {
  const [gameState, setGameState] = useState<GameState>({
    isRunning: true,
    isPaused: false,
    score: 0,
    coinsCollected: 0,
    distanceTraveled: 0,
    speedMultiplier: 1,
    timeElapsed: 0,
  })

  const [gameSpeed, setGameSpeed] = useState(GAME_CONFIG.initialGameSpeed)
  const [isGameOver, setIsGameOver] = useState(false)

  const playerRef = useRef(new Player(50))
  const worldRef = useRef(new World())
  const inputRef = useRef<InputHandler | null>(null)
  const gameLoopRef = useRef<number | null>(null)
  const frameCountRef = useRef(0)

  useEffect(() => {
    inputRef.current = new InputHandler()

    const gameLoop = () => {
      if (isGameOver) {
        if (inputRef.current?.isRestartPressed()) {
          restartGame()
        }
        gameLoopRef.current = requestAnimationFrame(gameLoop)
        return
      }

      const player = playerRef.current
      const world = worldRef.current
      const input = inputRef.current!

      if (input.isJumpPressed()) {
        player.jump()
      }

      player.update()
      world.update()

      setGameSpeed((prev) => {
        const newSpeed = Math.min(prev + GAME_CONFIG.speedIncrement / 60, GAME_CONFIG.maxGameSpeed)
        return newSpeed
      })

      const collision = checkPlayerObjectCollision(player.state, world.gameObjects)
      if (collision.type === "coin" && collision.objectId) {
        world.collectObject(collision.objectId)
        setGameState((prev) => ({
          ...prev,
          score: prev.score + 10,
          coinsCollected: prev.coinsCollected + 1,
        }))
      } else if (collision.type === "bomb") {
        setIsGameOver(true)
      }

      frameCountRef.current++
      setGameState((prev) => ({
        ...prev,
        distanceTraveled: frameCountRef.current * gameSpeed,
        timeElapsed: frameCountRef.current / 60,
      }))

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
      inputRef.current?.destroy()
    }
  }, [isGameOver])

  const restartGame = () => {
    playerRef.current = new Player(50)
    worldRef.current = new World()
    frameCountRef.current = 0
    setGameSpeed(GAME_CONFIG.initialGameSpeed)
    setGameState({
      isRunning: true,
      isPaused: false,
      score: 0,
      coinsCollected: 0,
      distanceTraveled: 0,
      speedMultiplier: 1,
      timeElapsed: 0,
    })
    setIsGameOver(false)
  }

  return (
    <div className="w-full h-screen bg-black flex flex-col">
      <GameCanvas
        playerState={playerRef.current.state}
        gameObjects={worldRef.current.gameObjects}
        gameState={gameState}
        gameSpeed={gameSpeed}
        isGameOver={isGameOver}
      />
      {isGameOver && (
        <button
          onClick={onBackToMenu}
          className="absolute top-4 left-4 px-6 py-2 bg-purple-600 text-white font-bold rounded hover:bg-purple-700"
        >
          Menu
        </button>
      )}
    </div>
  )
}
