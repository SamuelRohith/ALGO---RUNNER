import type { InputState } from "./types"

export class InputController {
  private jumpPressed = false
  private restartPressed = false
  private keys: Set<string> = new Set()

  constructor() {
    this.setupEventListeners()
  }

  private setupEventListeners() {
    window.addEventListener("keydown", (e) => {
      this.keys.add(e.code)

      if (e.code === "Space") {
        e.preventDefault()
        this.jumpPressed = true
      }

      if (e.code === "KeyR") {
        this.restartPressed = true
      }
    })

    window.addEventListener("keyup", (e) => {
      this.keys.delete(e.code)

      if (e.code === "Space") {
        this.jumpPressed = false
      }
    })
  }

  getInput(): InputState {
    const input: InputState = {
      jump: this.jumpPressed,
      moveLeft: false,
      moveRight: false,
      restart: this.restartPressed,
    }

    return input
  }

  isRestartPressed(): boolean {
    return this.restartPressed
  }

  clearRestartFlag() {
    this.restartPressed = false
  }

  destroy() {
    // Cleanup if needed
  }
}
