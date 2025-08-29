"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface SessionCompletionProps {
  completed: number
  totalQuestions: number
  correct: number
  incorrect: number
  unanswered: number
  onRestart: () => void
}

export default function SessionCompletion({
  completed,
  totalQuestions,
  correct,
  incorrect,
  unanswered,
  onRestart
}: SessionCompletionProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onRestart}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Setup
          </Button>
          <div className="text-lg font-semibold">Practice Session Ended</div>
        </div>
      </header>
      <div className="p-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Session Complete</h2>
          <p className="mb-2">Questions Completed: {completed} / {totalQuestions}</p>
          <p className="mb-2 text-green-600">Correct: {correct}</p>
          <p className="mb-2 text-red-600">Incorrect: {incorrect}</p>
          <p className="mb-2 text-yellow-600">Unanswered: {unanswered}</p>
          <Button className="mt-4" onClick={onRestart}>Restart Practice</Button>
        </div>
      </div>
    </div>
  )
}
