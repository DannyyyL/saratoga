import { useState, useEffect } from "react"
import { Twitter, Facebook, Linkedin, Copy, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { quotes } from "./quotes"

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null)
  const [fadeIn, setFadeIn] = useState(true)
  const { toast } = useToast()

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

  // Share functions
  const shareOnTwitter = () => {
    if (!quote) return
    const text = encodeURIComponent(`"${quote.text}" - ${quote.author}`)
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
  }

  const shareOnFacebook = () => {
    if (!quote) return
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    if (!quote) return
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(`Quote of the Day: "${quote.text}"`)
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, "_blank")
  }

  const copyToClipboard = () => {
    if (!quote) return
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`)
    toast({
      title: "Copied to clipboard",
      description: "Quote has been copied to your clipboard",
    })
  }

  if (!quote) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <Card className="w-full max-w-2xl bg-gray-800/50 border-gray-700 backdrop-blur-sm">
        <CardContent className="p-6 md:p-8">
          <div className={`transition-opacity duration-300 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
            <div className="mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Quote of the Day</h1>
              <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="mb-8 text-center">
              <blockquote className="text-xl md:text-2xl text-gray-100 italic mb-4">"{quote.text}"</blockquote>
              <cite className="text-lg text-purple-300 font-medium">— {quote.author}</cite>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex justify-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent border-gray-600 hover:bg-gray-700 hover:text-purple-400"
                  onClick={shareOnTwitter}
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent border-gray-600 hover:bg-gray-700 hover:text-purple-400"
                  onClick={shareOnFacebook}
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent border-gray-600 hover:bg-gray-700 hover:text-purple-400"
                  onClick={shareOnLinkedIn}
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-transparent border-gray-600 hover:bg-gray-700 hover:text-purple-400"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-5 w-5" />
                  <span className="sr-only">Copy to clipboard</span>
                </Button>
              </div>

              <Button onClick={getRandomQuote} className="mx-auto bg-purple-600 hover:bg-purple-700 text-white">
                <RefreshCw className="mr-2 h-4 w-4" />
                New Quote
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

