import { Twitter, Facebook, Linkedin, Copy, RefreshCw} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedNum } from "./components/ui/animatedNum"
import { Card, CardContent } from "@/components/ui/card"
import Sound from "./components/sound"
import { useState } from "react"
import { createRoot } from "react-dom/client"
//import { useToast } from "@/hooks/use-toast"

interface QuoteProps {
  quote: { text: string, author: string, real:boolean };
  fadeIn: boolean;
  onNewQuote: () => void;
}

export default function QuoteOfTheDay({ quote, fadeIn, onNewQuote }: QuoteProps) {
  //const { toast } = useToast()
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);

  const handleGuessReal = () => {
    const soundElement = document.createElement('div');
    document.body.appendChild(soundElement);
    if (quote.real) {
      setStreak(streak + 1);
      createRoot(soundElement).render(<Sound correct={true} />);
    }
    else {
      createRoot(soundElement).render(<Sound correct={false} />);
      setStreak(0);
    }
    if (userGuess === null) setUserGuess(true);
  };

  const handleGuessFake = () => {
    const soundElement = document.createElement('div');
    document.body.appendChild(soundElement);
    if (!(quote.real)) {
      setStreak(streak + 1);
      createRoot(soundElement).render(<Sound correct={true} />);
    }
    else {
      createRoot(soundElement).render(<Sound correct={false} />);
      setStreak(0);
    }
    if (userGuess === null) setUserGuess(false);
  };

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
    // toast({
    //   title: "Copied to clipboard",
    //   description: "Quote has been copied to your clipboard",
    // })
  }

  if (!quote) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <Card className="w-full max-w-2xl bg-gray-800/50 border-gray-700 backdrop-blur-sm border-t-0 border-b-0">
      <CardContent className="p-6 md:p-8">
        <div className={`transition-opacity duration-300 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Quote of the Day</h1>
          <div className="h-1 w-63 bg-purple-500 mx-auto rounded-full"></div>
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
              className="rounded-full border-gray-600 hover:bg-gray-700 hover:text-purple-400"
              onClick={shareOnTwitter}
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-600 hover:bg-gray-700 hover:text-purple-400"
              onClick={shareOnFacebook}
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full  border-gray-600 hover:bg-gray-700 hover:text-purple-400"
              onClick={shareOnLinkedIn}
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full  border-gray-600 hover:bg-gray-700 hover:text-purple-400"
              onClick={copyToClipboard}
            >
              <Copy className="h-5 w-5" />
              <span className="sr-only">Copy to clipboard</span>
            </Button>
          </div>

          <Button
            onClick={() => {
              setUserGuess(null);
              onNewQuote();
            }}
            disabled={userGuess === null}
            className={`
              mt-2 mx-auto text-white
              ${userGuess === null
                ? "bg-gray-600 cursor-not-allowed opacity-50"
                : "bg-purple-600 hover:bg-purple-800"}
            `}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            New Quote
          </Button>

          <div className="mt-2 mx-auto space-x-4">
            <Button
              onClick={handleGuessReal}
              disabled={userGuess !== null}
              className={
                userGuess === null
                  ? 'bg-purple-600 hover:bg-purple-800 text-white'
                  : quote.real
                  ? 'bg-green-600 hover:bg-green-600 text-white'
                  : 'bg-red-600 hover:bg-red-600 text-white'
              }
            >
              Real Quote
            </Button>
            <Button
              onClick={handleGuessFake}
              disabled={userGuess !== null}
              className={
                userGuess === null
                  ? 'bg-purple-600 hover:bg-purple-800 text-white'
                  : !quote.real
                  ? 'bg-green-600 hover:bg-green-600 text-white'
                  : 'bg-red-600 hover:bg-red-600 text-white'
              }
            >
              Fake Quote
            </Button>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="bg-purple-600 p-2 rounded-full inline-flex items-center justify-center">
            <AnimatedNum value={streak} />
          </div>
        </div>

      </div>
    </CardContent>
  </Card>
  )
}

