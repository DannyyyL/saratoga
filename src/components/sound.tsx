import { useEffect, useRef } from "react"

export default function Sound() {
  const correctSound = useRef(new Audio("/assets/sounds/streakSound.wav"))

  useEffect(() => {
    const audio = correctSound.current
    audio.volume = 0.5 // Set volume to 50%
    audio.currentTime=0
    audio.play().catch((error) => {
      console.error("Error playing sound:", error)
    })
  }, [])

  return null
}