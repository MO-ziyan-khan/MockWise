"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface ErrorScreenProps {
  onRestart: () => void
}

export default function ErrorScreen({ onRestart }: ErrorScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onRestart}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Setup
          </Button>
          <div className="text-lg font-semibold">Error Loading Question</div>
        </div>
      </header>
      <div className="p-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-muted-foreground">Unable to load the current question. Please try again.</p>
          <Button className="mt-4" onClick={onRestart}>Restart Practice</Button>
        </div>
      </div>
    </div>
  )
}
