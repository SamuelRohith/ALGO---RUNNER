// Input handling - centralized for easy remapping
export class InputHandler {
  private keys: Record<string, boolean> = {}

  constructor() {
    document.addEventListener("keydown", (e) => {
      this.keys[e.code] = true
    })
    document.addEventListener("keyup", (e) => {
      this.keys[e.code] = false
    })
  }

  isJumpPressed(): boolean {
    return this.keys["Space"] === true
  }

  isRestartPressed(): boolean {
    return this.keys["KeyR"] === true
  }

  reset(): void {
    this.keys = {}
  }

  destroy(): void {
    this.keys = {}
  }
}
