import { useEffect, useRef } from "react"

export default function Sound({correct} : {correct: boolean}) {
  const correctSound = useRef(new Audio("/assets/sounds/streakSound.wav"))
  const incorrectSound = useRef(new Audio("/assets/sounds/falseSound.wav"))

  useEffect(() => {
    const audio = correct ? correctSound.current : incorrectSound.current
    audio.volume = correct ? 0.5 : 0.1 // Set volume to 50%
    audio.currentTime=0
    audio.play().catch((error) => {
      console.error("Error playing sound:", error)
    })
  }, [])

  return null
}