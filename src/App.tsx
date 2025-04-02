// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import QuoteOfTheDay from './quote-of-the-day'
import { useState, useEffect } from "react"
import { quotes } from "./quotes"

function App() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null)
  const [fadeIn, setFadeIn] = useState(true)
  // Get a random quote
  const getRandomQuote = () => {
    setFadeIn(false)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      setQuote(quotes[randomIndex])
      setFadeIn(true)
    }, 300)
  }
  // Initialize with a random quote
  useEffect(() => {
    getRandomQuote()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <main className="flex-grow flex items-center justify-center p-4">
        <QuoteOfTheDay 
          quote={quote || { text: "", author: "" }} 
          fadeIn={fadeIn} 
          onNewQuote={getRandomQuote} 
        />
      </main>
      
      <footer className="py-3 px-4 text-center text-gray-400 bg-gray-800/60 
      backdrop-blur-sm border-t border-gray-700">
        <p className="text-sm"> Purely Satirical </p>
      </footer>
    </div>
  )
}

export default App
