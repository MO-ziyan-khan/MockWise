'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onResult?: (transcript: string) => void;
  onEnd?: () => void;
  continuous?: boolean;
  language?: string;
};

interface UseSpeechRecognitionReturn {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  error: string | null;
  browserSupportsSpeechRecognition: boolean;
}

// Define the SpeechRecognition type
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: {
    isFinal: boolean;
    [index: number]: SpeechRecognitionAlternative;
  };
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: (event: Event) => void;
}

const useSpeechRecognition = ({
  onResult,
  onEnd,
  continuous = false,
  language = 'en-US',
}: UseSpeechRecognitionProps = {}): UseSpeechRecognitionReturn => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [browserSupportsSpeechRecognition, setBrowserSupportsSpeechRecognition] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if the browser supports SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setBrowserSupportsSpeechRecognition(true);
        const recognitionInstance = new SpeechRecognition() as SpeechRecognition;
        
        recognitionInstance.continuous = continuous;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = language;
        
        setRecognition(recognitionInstance);
      } else {
        setError('Your browser does not support speech recognition.');
      }
    }
    
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [continuous, language]);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let currentTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          currentTranscript = transcript;
        }
      }
      
      // Only update the transcript with final results to avoid duplicates
      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript);
      }
      
      if (onResult) {
        // Pass both final and interim results
        onResult(finalTranscript || currentTranscript);
      }
    };

    recognition.onerror = (event: Event) => {
      console.error('Speech recognition error', event);
      setError('Error occurred in speech recognition');
    };

    recognition.onend = () => {
      setIsListening(false);
      if (onEnd) {
        onEnd();
      }
    };
  }, [recognition, onResult, onEnd]);

  const startListening = useCallback(() => {
    if (!recognition) return;
    
    setError(null);
    setIsListening(true);
    
    try {
      recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setError('Error starting speech recognition');
      setIsListening(false);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (!recognition) return;
    
    try {
      recognition.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    error,
    browserSupportsSpeechRecognition,
  };
};

export default useSpeechRecognition;

// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}