"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Upload,
  Mic,
  BookOpen,
  BarChart3,
  Settings,
  Home,
  FileText,
  Brain,
  Video,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter();
  
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card/30 px-4 py-6 border-muted">
        <nav className="space-y-2 sidebar-nav">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg bg-primary/20 px-3 py-2 text-primary transition-colors"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/resume-analyzer"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-muted/20 hover:text-white"
          >
            <FileText className="h-5 w-5" />
            Resume Analyzer
          </Link>
          <Link
            href="/dashboard/ai-interview"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-muted/20 hover:text-white"
          >
            <Brain className="h-5 w-5" />
            AI Interview
          </Link>
          <Link
            href="/dashboard/core-practice"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-muted/20 hover:text-white"
          >
            <BookOpen className="h-5 w-5" />
            Core Practice
          </Link>
          <Link
            href="/dashboard/reports"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-muted/20 hover:text-white"
          >
            <BarChart3 className="h-5 w-5" />
            Reports
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-muted/20 hover:text-white"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome back!</h1>
          <p className="text-slate-300">Ready to practice and improve your interview skills?</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Resume Analyzer Card */}
          <Card className="glow-card glow-hover group cursor-pointer rounded-xl bg-card border-muted">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl text-white">Resume Analyzer</CardTitle>
              <CardDescription className="text-slate-300">
                Get instant ATS score and detailed feedback on your resume
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                className="w-full gradient-primary hover:opacity-90 transition-all hover:scale-105"
                onClick={() => router.push("/dashboard/resume-analyzer")}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Resume
              </Button>
            </CardContent>
          </Card>

          {/* AI Interview Card */}
          <Card className="glow-card glow-hover group cursor-pointer rounded-xl bg-card border-muted">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 group-hover:bg-secondary/30 transition-colors">
                <div className="relative">
                  <Mic className="h-6 w-6 text-secondary" />
                  <Video className="absolute -top-1 -right-1 h-4 w-4 text-secondary" />
                </div>
              </div>
              <CardTitle className="text-xl text-white">Start AI Interview</CardTitle>
              <CardDescription className="text-slate-300">
                Practice with our AI interviewer using audio and video
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/dashboard/ai-interview">
                <Button className="w-full bg-gradient-to-r from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-primary/30 transition-all duration-300">
                  <Mic className="mr-2 h-4 w-4" />
                  Start Interview
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Core Subjects Practice Card */}
          <Card className="glow-card glow-hover group cursor-pointer rounded-xl bg-card border-muted">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 group-hover:bg-accent/30 transition-colors">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl text-white">Core Subjects Practice</CardTitle>
              <CardDescription className="text-slate-300">
                Master DSA, DBMS, OS, Networks and other core topics
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/dashboard/core-practice">
                <Button className="w-full gradient-primary hover:opacity-90 transition-all hover:scale-105">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Practice Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Reports Card */}
          <Card className="glow-card glow-hover group cursor-pointer rounded-xl bg-card border-muted">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-colors">
                <BarChart3 className="h-8 w-8 text-indigo-400" />
              </div>
              <CardTitle className="text-xl text-white">Performance Reports</CardTitle>
              <CardDescription className="text-slate-300">
                View detailed analytics and track your progress over time
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/dashboard/reports">
                <Button className="w-full gradient-primary hover:opacity-90 transition-all hover:scale-105">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <Card className="glow-card rounded-xl bg-card border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12</div>
            </CardContent>
          </Card>
          <Card className="glow-card rounded-xl bg-card border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">8.4/10</div>
            </CardContent>
          </Card>
          <Card className="glow-card rounded-xl bg-card border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Questions Practiced</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">156</div>
            </CardContent>
          </Card>
          <Card className="glow-card rounded-xl bg-card border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">+23%</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
