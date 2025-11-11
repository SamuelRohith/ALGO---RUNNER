"use client"

import { useState } from "react"
import GameScreen from "@/components/game-screen"
import MenuScreen from "@/components/menu-screen"
import MarketplaceScreen from "@/components/marketplace-screen"

type Screen = "menu" | "game" | "marketplace" | "options"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu")
  const [selectedStickman, setSelectedStickman] = useState<string>("yellow")

  const handleStartGame = () => {
    setCurrentScreen("game")
  }

  const handleBackToMenu = () => {
    setCurrentScreen("menu")
  }

  const handleOpenMarketplace = () => {
    setCurrentScreen("marketplace")
  }

  const handleOpenOptions = () => {
    setCurrentScreen("options")
  }

  const handleSelectStickman = (color: string) => {
    setSelectedStickman(color)
  }

  return (
    <main className="w-full min-h-screen">
      {currentScreen === "menu" && (
        <MenuScreen
          onStartGame={handleStartGame}
          onOpenMarketplace={handleOpenMarketplace}
          onOpenOptions={handleOpenOptions}
        />
      )}
      {currentScreen === "game" && <GameScreen onBackToMenu={handleBackToMenu} />}
      {currentScreen === "marketplace" && (
        <MarketplaceScreen
          onBackToMenu={handleBackToMenu}
          selectedStickman={selectedStickman}
          onSelectStickman={handleSelectStickman}
        />
      )}
      {currentScreen === "options" && (
        <div
          className="w-full min-h-screen flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #2d1b4e 0%, #1a0f2e 100%)" }}
        >
          <div className="w-full max-w-2xl mx-auto p-8 bg-purple-900 rounded-lg shadow-2xl">
            <h1 className="text-4xl font-bold text-center mb-8 text-white">Options</h1>
            <div className="space-y-4">
              <p className="text-lg text-purple-100">Sound: Coming Soon</p>
              <p className="text-lg text-purple-100">Difficulty: Coming Soon</p>
            </div>
            <button
              onClick={handleBackToMenu}
              className="mt-8 w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg hover:from-purple-700 hover:to-purple-800 transition"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
