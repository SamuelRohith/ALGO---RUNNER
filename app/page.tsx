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

        <button style={{ margin: "10px" }}>Marketplace</button>
        <button style={{ margin: "10px" }}>Options</button>
      </div>

      <hr style={{ width: "200px", margin: "20px auto" }} />

      {/* ✅ WALLET CONNECT / DISCONNECT */}
      {account ? (
        <>
          <p>✅ Connected Wallet:</p>
          <p
            style={{
              fontFamily: "monospace",
              background: "#222",
              padding: "10px",
              borderRadius: "8px",
              wordBreak: "break-all",
              display: "inline-block",
            }}
          >
            {account}
          </p>
          <br />
          <button
            onClick={handleDisconnect}
            style={{
              backgroundColor: "#ff5f5f",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "15px",
            }}
          >
            Disconnect Wallet
          </button>
        </>
      ) : (
        <button
          onClick={handleConnect}
          style={{
            backgroundColor: "#7b61ff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Connect Pera Wallet
        </button>
      )}
    </main>
  )
}
