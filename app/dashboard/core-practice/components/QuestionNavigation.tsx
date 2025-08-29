"use client"

import React from "react"
import { Button } from "@/components/ui/button"

interface QuestionNavigationProps {
  currentQuestion: number
  totalQuestions: number
  timeLeft: number
  isSessionEnded: boolean
  onPrevious: () => void
  onNext: () => void
  onEnd: () => void
  hasUnansweredQuestionsBefore: () => boolean
  hasUnansweredQuestionsAfter: () => boolean
}

export default function QuestionNavigation({
  currentQuestion,
  totalQuestions,
  timeLeft,
  isSessionEnded,
  onPrevious,
  onNext,
  onEnd,
  hasUnansweredQuestionsBefore,
  hasUnansweredQuestionsAfter
}: QuestionNavigationProps) {
  const min = Math.floor(timeLeft / 60)
  const sec = (timeLeft % 60).toString().padStart(2, "0")

  return (
    <div className="flex justify-between items-center pt-4">
      <Button 
        variant="outline" 
        onClick={onPrevious} 
        disabled={currentQuestion === 0 || isSessionEnded || !hasUnansweredQuestionsBefore()}
      >
        Previous
      </Button>
      
      <div className="text-sm text-muted-foreground">
        {!isSessionEnded ? `Time remaining: ${min}:${sec}` : "Session ended"}
      </div>
      
      {currentQuestion === totalQuestions - 1 ? (
        <Button onClick={onEnd} className="bg-green-600 hover:bg-green-700">
          Submit & End Practice
        </Button>
      ) : (
        <Button 
          onClick={onNext}
          disabled={!hasUnansweredQuestionsAfter()}
        >
          Next Question
        </Button>
      )}
    </div>
  )
}
