"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface LoadingScreenProps {
  onBackToSetup: () => void
}

export default function LoadingScreen({ onBackToSetup }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBackToSetup}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Setup
          </Button>
          <div className="text-lg font-semibold">Loading Questions...</div>
        </div>
      </header>
      <div className="p-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Preparing Your Practice Session</h2>
          <p className="text-muted-foreground">Please wait while we load your questions...</p>
        </div>
      </div>
    </div>
  )
}
