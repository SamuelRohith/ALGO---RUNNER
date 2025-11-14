"use client"

import React, { useState, useEffect } from "react"
import { peraWallet, connectToWallet, disconnectWallet } from "../src/walletConnect"

export default function Home() {
  const [account, setAccount] = useState<string | null>(null)

  useEffect(() => {
    // Try to reconnect automatically if session exists
    peraWallet.reconnectSession().then((accounts: string[]) => {
      if (accounts.length) {
        console.log("Reconnected account:", accounts[0])
        setAccount(accounts[0])
      }
    })
  }, [])

  const handleConnect = async () => {
    try {
      const newAccounts = await connectToWallet(setAccount)
      if (newAccounts && newAccounts.length > 0) {
        console.log("Connected account:", newAccounts[0])
        setAccount(newAccounts[0])
      }
    } catch (err) {
      console.error("Wallet connection failed:", err)
    }
  }

  const handleDisconnect = async () => {
    await disconnectWallet(setAccount)
    console.log("Wallet disconnected.")
  }

  return (
    <main
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial",
        color: "white",
      }}
    >
      <h1>🚀 ALGO RUNNER</h1>
      <p>Jump and collect coins!</p>

      <div style={{ margin: "20px" }}>
        {/* ✅ START GAME BUTTON LOGIC */}
        {account ? (
          <a href="/game">
            <button
              style={{
                margin: "10px",
                backgroundColor: "#00C853",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Start Game
            </button>
          </a>
        ) : (
          <button
            onClick={() => alert("⚠️ Please connect your Pera Wallet first!")}
            style={{
              margin: "10px",
              backgroundColor: "#555",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "not-allowed",
            }}
            disabled
          >
            Start Game
          </button>
        )}

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
