"use client"

interface MarketplaceScreenProps {
  onBackToMenu: () => void
  selectedStickman: string
  onSelectStickman: (color: string) => void
}

const STICKMEN = [
  { id: "yellow", name: "Classic Yellow", color: "#fbbf24", price: "Free" },
  { id: "red", name: "Red Hot", color: "#ef4444", price: "100 coins" },
  { id: "blue", name: "Cool Blue", color: "#3b82f6", price: "100 coins" },
  { id: "green", name: "Green Goblin", color: "#22c55e", price: "150 coins" },
  { id: "purple", name: "Purple Power", color: "#a855f7", price: "150 coins" },
  { id: "pink", name: "Pink Panther", color: "#ec4899", price: "200 coins" },
]

export default function MarketplaceScreen({
  onBackToMenu,
  selectedStickman,
  onSelectStickman,
}: MarketplaceScreenProps) {
  return (
    <div
      className="w-full min-h-screen p-8"
      style={{ background: "linear-gradient(135deg, #2d1b4e 0%, #1a0f2e 100%)" }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-white">Marketplace</h1>
        <p className="text-center text-purple-200 mb-8">Choose your stickman character!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {STICKMEN.map((stickman) => (
            <div
              key={stickman.id}
              className={`p-6 rounded-lg border-4 transition cursor-pointer ${
                selectedStickman === stickman.id
                  ? "border-purple-400 bg-purple-900"
                  : "border-purple-700 bg-purple-800 hover:border-purple-500"
              }`}
              onClick={() => onSelectStickman(stickman.id)}
            >
              <div className="flex justify-center mb-4">
                <svg width="80" height="100" viewBox="0 0 80 100">
                  {/* Head */}
                  <circle cx="40" cy="20" r="8" fill={stickman.color} />
                  {/* Body */}
                  <line x1="40" y1="28" x2="40" y2="50" stroke="#ffffff" strokeWidth="2" />
                  {/* Left arm */}
                  <line x1="40" y1="35" x2="25" y2="28" stroke="#ffffff" strokeWidth="2" />
                  {/* Right arm */}
                  <line x1="40" y1="35" x2="55" y2="28" stroke="#ffffff" strokeWidth="2" />
                  {/* Left leg */}
                  <line x1="40" y1="50" x2="30" y2="70" stroke="#ffffff" strokeWidth="2" />
                  {/* Right leg */}
                  <line x1="40" y1="50" x2="50" y2="70" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-center text-white mb-2">{stickman.name}</h3>
              <p className="text-center text-purple-300 mb-4">{stickman.price}</p>

              <button
                className={`w-full py-2 rounded font-bold transition ${
                  selectedStickman === stickman.id
                    ? "bg-purple-500 text-white"
                    : "bg-purple-700 text-white hover:bg-purple-600"
                }`}
              >
                {selectedStickman === stickman.id ? "Selected" : "Buy"}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onBackToMenu}
          className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg hover:from-purple-700 hover:to-purple-800 transition"
        >
          Back to Menu
        </button>
      </div>
    </div>
  )
}
