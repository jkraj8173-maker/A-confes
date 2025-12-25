"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { Heart, ArrowRight, Sparkles } from "lucide-react"

export default function SpecialMessage({ onComplete }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const messageRef = useRef(null)

  const fullMessage = `My Dearest Aradhya,

From the moment our eyes first met, I knew my life would never be the same. You walked into my world like a beautiful dream, bringing light to places I didn't even know were dark.

Every day with you feels like magic. Your smile brightens my darkest days, your laugh is the sweetest melody I've ever heard, and your love is the greatest gift I could ever receive.

I want to spend forever making you smile, forever holding your hand, forever being the reason you believe in love.

Will you be mine forever and always?

With all my love,
Your dudu 💕`

  useEffect(() => {
    if (currentIndex < fullMessage.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullMessage.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)

        if (messageRef.current) {
          messageRef.current.scrollTop = messageRef.current.scrollHeight
        }
      }, 20)
      return () => clearTimeout(timer)
    } else {
      setShowCursor(false)
      setTimeout(() => setShowButton(true), 1000)
    }
  }, [currentIndex, fullMessage])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col justify-center text-white px-4 py-4 md:px-6 md:py-6"
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showButton ? -6 : 0 }}
        className="flex flex-col max-w-4xl mx-auto w-full"
      >
        <motion.div
          className="relative rounded-3xl p-6 md:p-8 lg:p-12"
          style={{
            background: "linear-gradient(135deg, rgba(139, 0, 0, 0.08), rgba(255, 20, 60, 0.05), rgba(0, 0, 0, 0.4))",
            backdropFilter: "blur(25px)",
          }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(220, 20, 60, 0.4), 0 0 40px rgba(139, 0, 0, 0.3), 0 0 60px rgba(255, 0, 50, 0.2), inset 0 0 30px rgba(139, 0, 0, 0.1)",
              "0 0 30px rgba(220, 20, 60, 0.6), 0 0 60px rgba(139, 0, 0, 0.4), 0 0 90px rgba(255, 0, 50, 0.3), inset 0 0 40px rgba(139, 0, 0, 0.15)",
              "0 0 20px rgba(220, 20, 60, 0.4), 0 0 40px rgba(139, 0, 0, 0.3), 0 0 60px rgba(255, 0, 50, 0.2), inset 0 0 30px rgba(139, 0, 0, 0.1)",
            ],
            border: [
              "2px solid rgba(220, 20, 60, 0.5)",
              "2px solid rgba(255, 60, 80, 0.7)",
              "2px solid rgba(220, 20, 60, 0.5)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
            style={{
              background: "linear-gradient(45deg, transparent 40%, rgba(255, 100, 100, 0.03) 50%, transparent 60%)",
            }}
          />

          <div className="absolute top-4 left-4">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-red-400/60" />
            </motion.div>
          </div>
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            >
              <Sparkles className="w-5 h-5 text-red-400/60" />
            </motion.div>
          </div>

          <div className="text-center mb-6 relative z-10">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart
                className="w-10 h-10 md:w-12 md:h-12 text-red-500 fill-red-500 mx-auto"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(220, 20, 60, 0.8)) drop-shadow(0 0 30px rgba(255, 0, 50, 0.5))",
                }}
              />
            </motion.div>
          </div>

          <div
            ref={messageRef}
            className="max-h-[60vh] overflow-y-auto pr-2 scroll-smooth transition-all duration-500 relative z-10"
          >
            <pre
              className="text-base md:text-lg lg:text-xl font-light leading-relaxed whitespace-pre-line text-left"
              style={{
                color: "rgba(255, 220, 220, 0.95)",
                textShadow: "0 0 10px rgba(255, 150, 150, 0.3)",
              }}
            >
              {displayedText}
              {currentIndex < fullMessage.length && showCursor && (
                <span
                  className="inline-block w-0.5 h-4 md:h-5 ml-1 animate-pulse"
                  style={{ background: "linear-gradient(to bottom, #ff6b6b, #dc143c)" }}
                />
              )}
            </pre>
          </div>
        </motion.div>

        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="text-white px-8 md:px-10 py-4 rounded-full font-semibold text-base md:text-lg relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #dc143c, #8b0000)",
                boxShadow: "0 0 25px rgba(220, 20, 60, 0.5), 0 0 50px rgba(139, 0, 0, 0.3)",
                border: "1px solid rgba(255, 100, 100, 0.4)",
              }}
            >
              <span className="relative z-10 flex items-center gap-1 md:gap-2">
                <Heart className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                View Memories
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #ff4060, #a00020)" }}
              />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
