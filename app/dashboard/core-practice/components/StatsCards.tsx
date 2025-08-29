"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Target, BarChart3 } from "lucide-react"

export default function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3 mt-8">
      <Card>
        <CardHeader className="text-center pb-2">
          <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
          <CardTitle className="text-lg">Timed Practice</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center text-sm">
            Practice under time pressure to simulate real interview conditions
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-center pb-2">
          <Target className="h-8 w-8 mx-auto mb-2 text-secondary" />
          <CardTitle className="text-lg">Adaptive Difficulty</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center text-sm">
            Questions adapt to your skill level for optimal learning
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-center pb-2">
          <BarChart3 className="h-8 w-8 mx-auto mb-2 text-accent" />
          <CardTitle className="text-lg">Comprehensive Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center text-sm">
            Get detailed explanations and performance analytics
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}
