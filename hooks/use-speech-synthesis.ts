'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseSpeechSynthesisProps {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: SpeechSynthesisErrorEvent) => void;
  voice?: SpeechSynthesisVoice | null;
  rate?: number;
  pitch?: number;
  volume?: number;
}

interface UseSpeechSynthesisReturn {
  speak: (text: string) => void;
  cancel: () => void;
  speaking: boolean;
  voices: SpeechSynthesisVoice[];
  error: string | null;
  browserSupportsSpeechSynthesis: boolean;
  setVoice: (voice: SpeechSynthesisVoice) => void;
  setRate: (rate: number) => void;
  setPitch: (pitch: number) => void;
  setVolume: (volume: number) => void;
}

const useSpeechSynthesis = ({
  onStart,
  onEnd,
  onError,
  voice = null,
  rate = 1,
  pitch = 1,
  volume = 1,
}: UseSpeechSynthesisProps = {}): UseSpeechSynthesisReturn => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(voice);
  const [currentRate, setCurrentRate] = useState(rate);
  const [currentPitch, setCurrentPitch] = useState(pitch);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [error, setError] = useState<string | null>(null);
  const [browserSupportsSpeechSynthesis, setBrowserSupportsSpeechSynthesis] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        setBrowserSupportsSpeechSynthesis(true);

        // Get available voices
        const loadVoices = () => {
          const availableVoices = window.speechSynthesis.getVoices();
          if (availableVoices.length > 0) {
            setVoices(availableVoices);
            
            // Set default voice if not already set
            if (!currentVoice) {
              // Try to find an English voice
              const englishVoice = availableVoices.find(v => 
                v.lang.includes('en-US') || v.lang.includes('en-GB')
              );
              setCurrentVoice(englishVoice || availableVoices[0]);
            }
          }
        };

        loadVoices();

        // Chrome loads voices asynchronously
        window.speechSynthesis.onvoiceschanged = loadVoices;

        // Clean up
        return () => {
          window.speechSynthesis.cancel();
          window.speechSynthesis.onvoiceschanged = null;
        };
      } else {
        setError('Your browser does not support speech synthesis.');
      }
    }
  }, [currentVoice]);

  const speak = useCallback(
    (text: string) => {
      if (!browserSupportsSpeechSynthesis) {
        setError('Speech synthesis is not supported in this browser.');
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      if (currentVoice) {
        utterance.voice = currentVoice;
      }
      
      utterance.rate = currentRate;
      utterance.pitch = currentPitch;
      utterance.volume = currentVolume;

      utterance.onstart = () => {
        setSpeaking(true);
        if (onStart) onStart();
      };

      utterance.onend = () => {
        setSpeaking(false);
        if (onEnd) onEnd();
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setSpeaking(false);
        setError('Error in speech synthesis');
        if (onError) onError(event);
      };

      window.speechSynthesis.speak(utterance);
    },
    [browserSupportsSpeechSynthesis, currentVoice, currentRate, currentPitch, currentVolume, onStart, onEnd, onError]
  );

  const cancel = useCallback(() => {
    if (browserSupportsSpeechSynthesis) {
      setSpeaking(false);
      window.speechSynthesis.cancel();
    }
  }, [browserSupportsSpeechSynthesis]);

  return {
    speak,
    cancel,
    speaking,
    voices,
    error,
    browserSupportsSpeechSynthesis,
    setVoice: setCurrentVoice,
    setRate: setCurrentRate,
    setPitch: setCurrentPitch,
    setVolume: setCurrentVolume,
  };
};

export default useSpeechSynthesis;