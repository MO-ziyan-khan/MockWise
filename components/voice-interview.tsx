'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ChatBubble from '@/components/ui/chat-bubble';
import useSpeechRecognition from '@/hooks/use-speech-recognition';
import useSpeechSynthesis from '@/hooks/use-speech-synthesis';
import { Mic, MicOff, Play, Square } from 'lucide-react';

interface Message {
  content: string;
  isAI: boolean;
  timestamp: string;
}

interface VoiceInterviewProps {
  jobRole: string;
  technologies: string[];
  onComplete?: () => void;
}

const VoiceInterview = ({ jobRole, technologies, onComplete }: VoiceInterviewProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isWaitingForUserResponse, setIsWaitingForUserResponse] = useState(false);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Generate domain-specific questions based on selected technologies
  const generateDomainQuestions = useCallback(() => {
    const domainQuestions: string[] = [];
    
    if (technologies.includes('React')) {
      domainQuestions.push('Can you explain the concept of React hooks and how they improve component development?');
    }
    if (technologies.includes('JavaScript')) {
      domainQuestions.push('How do you handle asynchronous operations in JavaScript?');
    }
    if (technologies.includes('Python')) {
      domainQuestions.push('What are Python generators and when would you use them?');
    }
    if (technologies.includes('Node.js')) {
      domainQuestions.push('Explain how the event loop works in Node.js.');
    }
    if (technologies.includes('Machine Learning')) {
      domainQuestions.push('What is the difference between supervised and unsupervised learning?');
    }
    if (technologies.includes('Data Science')) {
      domainQuestions.push('How do you handle missing data in a dataset?');
    }
    if (technologies.includes('AWS')) {
      domainQuestions.push('Describe your experience with AWS services and which ones you have used.');
    }
    if (technologies.includes('Docker')) {
      domainQuestions.push('How do Docker containers differ from virtual machines?');
    }
    
    // Add generic questions for any technology not specifically covered
    if (domainQuestions.length < 2) {
      domainQuestions.push(
        `What experience do you have with ${technologies[0]}?`,
        `Can you describe a challenging project where you used ${technologies.length > 1 ? technologies[1] : technologies[0]}?`
      );
    }
    
    return domainQuestions.slice(0, 3); // Limit to 3 domain questions
  }, [technologies]);

  // Define interview questions
  const baseQuestions = [
    'Tell me about yourself.',
    'What are your strengths and weaknesses?',
    'Why should we hire you?'
  ];
  
  const domainQuestions = generateDomainQuestions();
  const allQuestions = [...baseQuestions, ...domainQuestions];

  // Speech recognition hook
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    onEnd: () => {
      if (transcript) {
        addMessage(transcript, false);
        moveToNextQuestion();
      }
    }
  });

  // Speech synthesis hook
  const {
    speak,
    cancel,
    speaking,
    browserSupportsSpeechSynthesis
  } = useSpeechSynthesis({
    onStart: () => setIsAISpeaking(true),
    onEnd: () => {
      setIsAISpeaking(false);
      setIsWaitingForUserResponse(true);
    }
  });

  // Format current time for message timestamp
  const getFormattedTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  // Add a message to the conversation
  const addMessage = (content: string, isAI: boolean) => {
    setMessages(prev => [
      ...prev,
      {
        content,
        isAI,
        timestamp: getFormattedTime()
      }
    ]);
  };

  // Start the interview
  const startInterview = () => {
    setShowInstructions(false);
    setCurrentQuestionIndex(0);
  };

  // Move to the next question
  const moveToNextQuestion = () => {
    setIsWaitingForUserResponse(false);
    
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < allQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      // Interview is complete
      setIsInterviewComplete(true);
      addMessage('Thank you for completing this interview. You did great!', true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  // Handle user recording
  const handleRecordAnswer = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  // Effect to speak the current question
  useEffect(() => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < allQuestions.length) {
      const question = allQuestions[currentQuestionIndex];
      addMessage(question, true);
      speak(question);
    }
  }, [currentQuestionIndex, allQuestions, speak]);

  // Show browser support warning if needed
  if (!browserSupportsSpeechRecognition || !browserSupportsSpeechSynthesis) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Browser Not Supported</h3>
            <p className="text-muted-foreground">
              Your browser doesn't support the Web Speech API. Please try using Chrome, Edge, or Safari.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {showInstructions ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Voice Interview Instructions</h3>
              <div className="space-y-2 text-left">
                <p>Welcome to your AI interview for the <strong>{jobRole}</strong> position.</p>
                <p>Here's how it works:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The AI interviewer will ask you questions one by one</li>
                  <li>Speak clearly after the AI finishes asking each question</li>
                  <li>Your answers will be automatically transcribed</li>
                  <li>Click the microphone button to start/stop recording your answer</li>
                  <li>The interview will progress through standard and {technologies.join(', ')} specific questions</li>
                </ul>
              </div>
              <Button onClick={startInterview} className="mt-4">
                <Play className="mr-2 h-4 w-4" />
                Begin Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="h-[400px] overflow-y-auto border rounded-lg p-4 bg-background">
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                content={message.content}
                isAI={message.isAI}
                timestamp={message.timestamp}
              />
            ))}
            {isListening && (
              <ChatBubble
                content={transcript || 'Listening...'}
                isAI={false}
                isLoading={!transcript}
              />
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {isInterviewComplete 
                ? 'Interview complete' 
                : `Question ${currentQuestionIndex + 1} of ${allQuestions.length}`}
            </div>
            
            <div className="space-x-2">
              {isWaitingForUserResponse && !isInterviewComplete && (
                <Button
                  onClick={handleRecordAnswer}
                  variant={isListening ? "destructive" : "default"}
                  disabled={isAISpeaking}
                >
                  {isListening ? (
                    <>
                      <Square className="mr-2 h-4 w-4" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Record Answer
                    </>
                  )}
                </Button>
              )}
              
              {isAISpeaking && (
                <Button variant="outline" onClick={cancel}>
                  <MicOff className="mr-2 h-4 w-4" />
                  Skip AI Speech
                </Button>
              )}
            </div>
          </div>

          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / allQuestions.length) * 100}%` }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default VoiceInterview;