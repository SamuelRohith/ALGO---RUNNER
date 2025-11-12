import React, { useState, useEffect } from "react"
import { peraWallet, connectToWallet, disconnectWallet } from "./walletConnect"

function App() {
  const [account, setAccount] = useState(null)

  useEffect(() => {
    peraWallet.reconnectSession().then((accounts) => {
      if (accounts.length) setAccount(accounts[0])
    })
  }, [])

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🚀 Algorand Wallet Connection</h2>

      {account ? (
        <>
          <p>Connected: {account}</p>
          <button onClick={() => disconnectWallet(setAccount)}>Disconnect</button>
        </>
      ) : (
        <button onClick={() => connectToWallet(setAccount)}>Connect Pera Wallet</button>
      )}
    </div>
  )
}

export default App
