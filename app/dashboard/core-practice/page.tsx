"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Import components
import PracticeConfiguration from "./components/PracticeConfiguration"
import SubjectGrid from "./components/SubjectGrid"
import StatsCards from "./components/StatsCards"
import QuestionDisplay from "./components/QuestionDisplay"
import QuestionNavigation from "./components/QuestionNavigation"
import SessionHeader from "./components/SessionHeader"
import SessionCompletion from "./components/SessionCompletion"
import LoadingScreen from "./components/LoadingScreen"
import ErrorScreen from "./components/ErrorScreen"

// Import types and constants
import { Subject, DifficultyLevel } from "./types"
import { subjects, difficultyLevels, questionCounts } from "./constants"

// Import custom hook
import { usePracticeSession } from "./hooks/usePracticeSession"

export default function CorePracticePage() {
  const [selectedSubject, setSelectedSubject] = useState("")
  const [questionCount, setQuestionCount] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [isPracticeStarted, setIsPracticeStarted] = useState(false)

  // Use custom hook for practice session logic
  const {
    questions,
    currentQuestion,
    answers,
    timer,
    timeLeft,
    isSessionEnded,
    isLoading,
    isAIGenerated,
    isQuestionLocked,
    handleSelectOption,
    handlePrev,
    handleNext,
    handleEnd,
    handleRestart,
    hasUnansweredQuestionsBefore,
    hasUnansweredQuestionsAfter
  } = usePracticeSession(isPracticeStarted, selectedSubject, questionCount, difficulty)

  const handleStartPractice = () => {
    setIsPracticeStarted(true)
  }

  const handleBackToSetup = () => {
    setIsPracticeStarted(false)
    handleRestart()
  }

  // Progress calculations
  const completed = answers.filter((a) => a !== null && a !== -1).length
  const correct = answers.filter((a, i) => a !== null && a !== -1 && questions[i]?.answer === a).length
  const incorrect = answers.filter((a, i) => a !== null && a !== -1 && questions[i]?.answer !== a).length
  const unanswered = answers.filter((a) => a === -1).length

  // Get difficulty label for display
  const selectedDifficultyData = difficultyLevels.find((d) => d.value === difficulty)

  // Render different states based on practice session status
  if (isPracticeStarted) {
    if (isSessionEnded) {
      return (
        <SessionCompletion
          completed={completed}
          totalQuestions={questions.length}
          correct={correct}
          incorrect={incorrect}
          unanswered={unanswered}
          onRestart={handleBackToSetup}
        />
      )
    }

    if (isLoading) {
      return <LoadingScreen onBackToSetup={handleBackToSetup} />
    }

    const currentQ = questions[currentQuestion]
    if (!currentQ) {
      return <ErrorScreen onRestart={handleBackToSetup} />
    }

    return (
      <div className="min-h-screen bg-background">
        <SessionHeader
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          timeLeft={timeLeft}
          onBackToSetup={handleBackToSetup}
        />
        
        <div className="p-6">
          <div className="mx-auto max-w-4xl">
            {/* AI Generation Warning */}
            {isAIGenerated && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 text-sm">
                  ⚠️ Questions were generated using AI. Some may be less accurate than curated content.
                </p>
              </div>
            )}

            {/* Question Display */}
            <QuestionDisplay
              question={currentQ}
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              difficulty={selectedDifficultyData?.label || difficulty}
              answers={answers}
              onOptionSelect={handleSelectOption}
              isQuestionLocked={isQuestionLocked}
            />

            {/* Question Navigation */}
            <QuestionNavigation
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              timeLeft={timeLeft}
              isSessionEnded={isSessionEnded}
              onPrevious={handlePrev}
              onNext={handleNext}
              onEnd={handleEnd}
              hasUnansweredQuestionsBefore={hasUnansweredQuestionsBefore}
              hasUnansweredQuestionsAfter={hasUnansweredQuestionsAfter}
            />
          </div>
        </div>
      </div>
    )
  }

  // Setup screen
  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        {/* Back to Dashboard Button - Right Corner */}
        <div className="mb-6 flex justify-end">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Core Subjects Practice</h1>
          <p className="text-muted-foreground text-lg">
            Master fundamental computer science concepts with curated questions
          </p>
        </div>

        {/* Configuration */}
        <PracticeConfiguration
          subjects={subjects}
          difficultyLevels={difficultyLevels}
          questionCounts={questionCounts}
          selectedSubject={selectedSubject}
          questionCount={questionCount}
          difficulty={difficulty}
          onSubjectChange={setSelectedSubject}
          onQuestionCountChange={setQuestionCount}
          onDifficultyChange={setDifficulty}
          onStartPractice={handleStartPractice}
        />

        {/* Subject Grid */}
        <SubjectGrid
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSubjectSelect={setSelectedSubject}
        />

        {/* Stats Cards */}
        <StatsCards />
      </div>
    </div>
  )
}
