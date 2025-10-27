"use client"

interface MenuScreenProps {
  onStartGame: () => void
  onOpenMarketplace: () => void
  onOpenOptions: () => void
}

export default function MenuScreen({ onStartGame, onOpenMarketplace, onOpenOptions }: MenuScreenProps) {
  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #2d1b4e 0%, #1a0f2e 100%)" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-white mb-2 drop-shadow-lg">ALGO</h1>
          <p className="text-5xl font-black text-white drop-shadow-lg">RUNNER</p>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto mt-4"></div>
        </div>

        <p className="text-center text-purple-100 mb-12 text-lg font-medium">Jump and collect coins!</p>

        <div className="space-y-4">
          <button
            onClick={onStartGame}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-xl rounded-lg hover:from-purple-700 hover:to-purple-800 transition transform hover:scale-105 shadow-lg"
          >
            Start Game
          </button>

          <button
            onClick={onOpenMarketplace}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold text-xl rounded-lg hover:from-purple-600 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
          >
            Marketplace
          </button>

          <button
            onClick={onOpenOptions}
            className="w-full px-8 py-4 bg-white text-purple-700 font-bold text-xl rounded-lg hover:bg-purple-50 transition transform hover:scale-105 shadow-lg"
          >
            Options
          </button>
        </div>

        <div className="mt-12 text-center text-purple-300 text-sm">
          <p>Press SPACE to jump</p>
          <p>Press R to restart</p>
        </div>
      </div>
    </div>
  )
}
