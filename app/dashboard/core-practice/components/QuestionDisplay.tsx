"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Question {
  question: string
  options: string[]
  answer: number
  difficulty: string
  explanation: string
}

interface QuestionDisplayProps {
  question: Question
  currentQuestion: number
  totalQuestions: number
  difficulty: string
  answers: (number | null)[]
  onOptionSelect: (optionIndex: number) => void
  isQuestionLocked: (questionIndex: number) => boolean
}

export default function QuestionDisplay({
  question,
  currentQuestion,
  totalQuestions,
  difficulty,
  answers,
  onOptionSelect,
  isQuestionLocked
}: QuestionDisplayProps) {
  const isLocked = isQuestionLocked(currentQuestion)
  const userAnswer = answers[currentQuestion]

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Question {currentQuestion + 1} of {totalQuestions}</CardTitle>
          <div className="flex items-center gap-2">
            {isLocked && (
              <Badge variant="secondary" className="text-xs">
                {userAnswer === -1 ? "Time's Up" : "Answered"}
              </Badge>
            )}
            <Badge variant="outline">{difficulty}</Badge>
          </div>
        </div>
        {isLocked && (
          <CardDescription className="text-amber-600">
            {userAnswer === -1 
              ? "This question timed out. You cannot change your answer."
              : "You have already answered this question. You cannot change your answer."
            }
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>
          
          <div className="space-y-2">
            {question.options.map((opt: string, idx: number) => (
              <div
                key={idx}
                className={`p-3 border rounded-lg transition-colors ${
                  isLocked
                    ? "cursor-not-allowed opacity-60" // Disabled when locked
                    : "cursor-pointer hover:bg-accent/10" // Clickable when unlocked
                } ${
                  userAnswer === idx 
                    ? userAnswer === question.answer
                      ? "bg-green-200 border-green-600 text-green-800" // Correct answer selected
                      : "bg-red-200 border-red-600 text-red-800" // Wrong answer selected
                    : userAnswer !== null && userAnswer !== -1 && question.answer === idx
                      ? "bg-green-200 border-green-600 text-green-800" // Correct answer (only shown after selection)
                      : ""
                }`}
                onClick={() => onOptionSelect(idx)}
              >
                <span className="font-medium">{String.fromCharCode(65 + idx)})</span> {opt}
                {userAnswer === idx && userAnswer !== question.answer && (
                  <span className="text-red-700 text-sm ml-2 font-semibold">❌ Wrong</span>
                )}
                {userAnswer !== null && userAnswer !== -1 && question.answer === idx && (
                  <span className="text-green-700 text-sm ml-2 font-semibold">✅ Correct</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Answer Explanation */}
        {(userAnswer !== null && userAnswer !== -1) && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
            <p className="text-blue-700 text-sm">
              {userAnswer === question.answer 
                ? `Excellent! You selected the correct answer. ${question.explanation || "This question tests your understanding of the concept."}`
                : `The correct answer is ${String.fromCharCode(65 + question.answer)}: ${question.options[question.answer]}. ${
                    question.explanation || "This question tests your understanding of the concept."
                  }`
              }
            </p>
          </div>
        )}

        {/* Time's Up Message */}
        {userAnswer === -1 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">Time's Up!</h4>
            <p className="text-yellow-700 text-sm">
              You didn't answer this question in time. The correct answer is {String.fromCharCode(65 + question.answer)}: {question.options[question.answer]}. {question.explanation || "This question tests your understanding of the concept."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
