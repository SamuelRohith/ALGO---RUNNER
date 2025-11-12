import { PeraWalletConnect } from "@perawallet/connect"

export const peraWallet = new PeraWalletConnect()

export async function connectToWallet(setAccount) {
  try {
    const newAccounts = await peraWallet.connect()
    if (newAccounts.length) {
      setAccount(newAccounts[0])
      peraWallet.connector?.on("disconnect", () => setAccount(null))
    }
    return newAccounts
  } catch (err) {
    console.error("Wallet connection failed:", err)
  }
}

export async function disconnectWallet(setAccount) {
  await peraWallet.disconnect()
  setAccount(null)
}
