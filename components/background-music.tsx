"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Music } from "lucide-react"

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    try {
      audioRef.current = new Audio("/sounds/jungle-ambience.mp3")
      audioRef.current.loop = true
      audioRef.current.volume = 0.2
      
      audioRef.current.addEventListener('canplaythrough', () => {
        setIsLoaded(true);
        setError(false);
      });
      
      audioRef.current.addEventListener('error', () => {
        console.log("Audio file could not be loaded");
        setError(true);
        setIsLoaded(false);
      });
      
      // Check if audio already exists
      if (audioRef.current.readyState >= 3) {
        setIsLoaded(true);
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.src = ""
        }
      }
    } catch (err) {
      console.error("Error setting up audio:", err);
      setError(true);
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current || error) return;
    
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      // Attempting to play might fail if the user hasn't interacted with the page
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio started playing successfully
          })
          .catch(err => {
            console.error("Playback prevented by browser:", err);
            // Handle the error - often happens due to autoplay policy
          });
      }
    }
    setIsPlaying(!isPlaying)
  }

  // Don't show button if there's an error loading the audio file
  if (error) return null;

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#243420]/80 backdrop-blur-sm text-[#D4A72C] shadow-lg border border-[#4A6D33]/30"
      onClick={togglePlay}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      aria-label={isPlaying ? "Mute jungle sounds" : "Play jungle sounds"}
      disabled={!isLoaded}
    >
      {isPlaying ? (
        <Volume2 className="h-6 w-6" />
      ) : (
        <VolumeX className="h-6 w-6" />
      )}
      
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="absolute -top-1 -right-1 -bottom-1 -left-1 rounded-full border-2 border-[#D4A72C]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.3 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeOut"
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}
