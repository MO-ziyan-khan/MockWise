"use client"

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Brain, BarChart3, Target } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Mock<span className="text-primary">Wise</span>
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hover:bg-accent/30 dark:hover:bg-accent/30 transition-all duration-300">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-primary/30 transition-all duration-300">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Ace Your Interview Preparation
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            AI-powered interview preparation platform for students and professionals. 
            Practice with curated questions, get instant feedback, and track your progress.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="px-8 py-3 text-lg">
                Start Practicing Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-muted/20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Everything you need to succeed
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Core Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Master fundamental computer science concepts with curated questions
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>AI Interview</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Practice with AI-powered mock interviews and get instant feedback
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Monitor your performance and identify areas for improvement
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Resume Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get AI-powered feedback on your resume and improve your profile
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to start practicing?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of students and professionals who are already improving their interview skills.
          </p>
          <Link href="/signup">
            <Button size="lg" className="px-8 py-3 text-lg bg-gradient-to-r from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-primary/30 hover:scale-105 transition-all duration-300">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
