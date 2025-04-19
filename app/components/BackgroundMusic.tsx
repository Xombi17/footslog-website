import { useEffect, useRef, useState } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio('/sounds/jungle-ambience.mp3');
    audio.loop = true;
    audio.volume = 0.1; // Start with low volume

    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
      audioRef.current = audio;
    });

    audio.addEventListener('error', (e) => {
      console.log('Audio loading error:', e);
      setError('Background audio not available');
    });

    // Cleanup
    return () => {
      audio.pause();
      audio.remove();
    };
  }, []);

  // Don't render anything if there's an error
  if (error) return null;

  return null; // Component doesn't need to render anything
} 