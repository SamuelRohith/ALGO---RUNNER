// Configuration file - easily editable without touching game logic
import type { GameConfig } from "@/lib/types/game"

export const GAME_CONFIG: GameConfig = {
  canvasWidth: 1920,
  canvasHeight: 1080,
  groundY: 900,
  gravity: 0.6,
  jumpPower: -20,
  gameSpeed: 3,
  initialGameSpeed: 3,
  maxGameSpeed: 8,
  speedIncrement: 0.5,
  coinSpawnRate: 120,
  bombSpawnRate: 250,
}

// Color scheme - dark purple and white theme
export const COLORS = {
  background: "#1a0f2e",
  darkPurple: "#2d1b4e",
  purple: "#6b21a8",
  lightPurple: "#a855f7",
  white: "#ffffff",
  coin: "#fbbf24",
  bomb: "#000000",
  text: "#ffffff",
  groundLine: "#a855f7",
}

// Sprite URLs - can be replaced for different character skins
export const SPRITES = {
  idle: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/StandingSillPose-5khuXv4VelU1GcAilqEbG3QPUk8Nmd.png",
  jump: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/JumpPose-hq7v9oViyCM3xU93XuwjyeDy0eXwdw.png",
  land: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AfterJumpLandingPose-AfeEcCTI9RwrNBQTeqSP3KEnF6Z3Xd.png",
  runLeft1:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LeftRunningPose-Ktd4AptwzczmxleBgWnrm22Rp7YVtA.png",
  runLeft2:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LeftRunningPose2-q6aXTjHUy15OnENqALgtDjvkwKqZQR.png",
  runRight1:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RightRunningPose-1mu0pXw7rjj5C81W7GMV4JBfpYgMW5.png",
  runRight2:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RightRunningPose2.png-ibeOdO1KkrJU1FwJoqidOiZjUpeFjZ.jpeg",
  run2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RunPose2-TZ7SFpciXEsrjSHC4KZVaj66xmjX4Z.png",
  run21: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Runpose21-xtFhLWf3qbtrLANRBYCLLNZB6rEOK2.png",
}
