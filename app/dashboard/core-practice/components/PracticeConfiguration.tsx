"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Play } from "lucide-react"

interface Subject {
  id: string
  name: string
  description: string
}

interface DifficultyLevel {
  value: string
  label: string
  bgColor: string
  color: string
}

interface PracticeConfigurationProps {
  subjects: Subject[]
  difficultyLevels: DifficultyLevel[]
  questionCounts: number[]
  selectedSubject: string
  questionCount: string
  difficulty: string
  onSubjectChange: (value: string) => void
  onQuestionCountChange: (value: string) => void
  onDifficultyChange: (value: string) => void
  onStartPractice: () => void
}

export default function PracticeConfiguration({
  subjects,
  difficultyLevels,
  questionCounts,
  selectedSubject,
  questionCount,
  difficulty,
  onSubjectChange,
  onQuestionCountChange,
  onDifficultyChange,
  onStartPractice
}: PracticeConfigurationProps) {
  return (
    <Card className="mb-8">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
          <BookOpen className="h-10 w-10 text-accent" />
        </div>
        <CardTitle className="text-2xl">Configure Your Practice Session</CardTitle>
        <CardDescription className="text-base">
          Choose your subject, difficulty level, and number of questions to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subject Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Select Subject</label>
          <Select value={selectedSubject} onValueChange={onSubjectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a subject to practice" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{subject.name}</span>
                    <span className="text-xs text-muted-foreground">{subject.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Number of Questions */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Number of Questions</label>
          <Select value={questionCount} onValueChange={onQuestionCountChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="How many questions?" />
            </SelectTrigger>
            <SelectContent>
              {questionCounts.map((count) => (
                <SelectItem key={count} value={count.toString()}>
                  {count} questions
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty Level */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Difficulty Level</label>
          <Select value={difficulty} onValueChange={onDifficultyChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select difficulty level" />
            </SelectTrigger>
            <SelectContent>
              {difficultyLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${level.bgColor}`}></div>
                    <span>{level.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Start Button */}
        <div className="text-center pt-4">
          <Button
            size="lg"
            className="px-8 py-3 text-lg"
            onClick={onStartPractice}
            disabled={!selectedSubject || !questionCount || !difficulty}
          >
            <Play className="mr-2 h-5 w-5" />
            Start Practice
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
