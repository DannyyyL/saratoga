// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import QuoteOfTheDay from './quote-of-the-day'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
    <main className="flex-grow flex items-center justify-center p-4">
      <QuoteOfTheDay />
    </main>
    
    <footer className="py-3 px-4 text-center text-gray-400 bg-gray-800/60 backdrop-blur-sm border-t border-gray-700">
      <p className="text-sm"> Purely Satirical </p>
    </footer>
  </div>
  )
}

export default App
