"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

interface SessionHeaderProps {
  currentQuestion: number
  totalQuestions: number
  timeLeft: number
  onBackToSetup: () => void
}

export default function SessionHeader({
  currentQuestion,
  totalQuestions,
  timeLeft,
  onBackToSetup
}: SessionHeaderProps) {
  const min = Math.floor(timeLeft / 60)
  const sec = (timeLeft % 60).toString().padStart(2, "0")

  return (
    <header className="border-b bg-card/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBackToSetup}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Setup
          </Button>
          <div className="text-lg font-semibold">Practice Session</div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">Question {currentQuestion + 1} of {totalQuestions}</Badge>
          <div className="text-sm text-muted-foreground">{min}:{sec}</div>
        </div>
      </div>
    </header>
  )
}
