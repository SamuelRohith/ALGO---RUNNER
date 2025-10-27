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
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-400 to-sky-200">
      {currentScreen === "menu" && (
        <MenuScreen
          onStartGame={handleStartGame}
          onOpenMarketplace={handleOpenMarketplace}
          onOpenOptions={handleOpenOptions}
        />
      )}
      {currentScreen === "game" && <GameScreen onBackToMenu={handleBackToMenu} stickmanColor={selectedStickman} />}
      {currentScreen === "marketplace" && (
        <MarketplaceScreen
          onBackToMenu={handleBackToMenu}
          selectedStickman={selectedStickman}
          onSelectStickman={handleSelectStickman}
        />
      )}
      {currentScreen === "options" && (
        <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-slate-900">Options</h1>
          <div className="space-y-4">
            <p className="text-lg text-slate-700">Sound: Coming Soon</p>
            <p className="text-lg text-slate-700">Difficulty: Coming Soon</p>
          </div>
          <button
            onClick={handleBackToMenu}
            className="mt-8 w-full px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Back to Menu
          </button>
        </div>
      )}
    </main>
  )
}
