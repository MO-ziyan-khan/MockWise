"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Subject {
  id: string
  name: string
  description: string
}

interface SubjectGridProps {
  subjects: Subject[]
  selectedSubject: string
  onSubjectSelect: (subjectId: string) => void
}

export default function SubjectGrid({ subjects, selectedSubject, onSubjectSelect }: SubjectGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {subjects.slice(0, 8).map((subject) => (
        <Card
          key={subject.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedSubject === subject.id ? "border-primary bg-primary/5" : ""
          }`}
          onClick={() => onSubjectSelect(subject.id)}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{subject.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-xs">{subject.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
