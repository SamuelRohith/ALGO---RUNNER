"use client"

import React, { useState } from "react"
import Link from "next/link"
import GameScreen from "../../components/game-screen"
import { peraWallet } from "../../src/walletConnect"

export default function GamePage() {
  const [inGame, setInGame] = useState(true)

  return (
    <main
      style={{
        textAlign: "center",
        marginTop: "40px",
        fontFamily: "Arial",
        color: "white",
      }}
    >
      {inGame ? (
        <GameScreen
          onBackToMenu={() => setInGame(false)}
          stickmanColor="#7b61ff"
        />
      ) : (
        <div>
          <h1>🏠 Back to Main Menu</h1>
          <Link href="/">
            <button
              style={{
                backgroundColor: "#7b61ff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Return Home
            </button>
          </Link>
        </div>
      )}
    </main>
  )
}
