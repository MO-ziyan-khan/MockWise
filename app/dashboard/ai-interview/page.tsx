"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Mic, Play, Video } from "lucide-react"
import Link from "next/link"
import VoiceInterview from "@/components/voice-interview"
import TechSelector from "@/components/ui/tech-selector"

const technologies = [
  "Python",
  "Java",
  "JavaScript",
  "React",
  "Node.js",
  "Machine Learning",
  "Data Science",
  "SQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Kubernetes",
  "C++",
  "C#",
  ".NET",
  "Angular",
  "Vue.js",
  "Django",
  "Flask",
]

const jobRoles = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Product Manager",
  "UI/UX Designer",
  "QA Engineer",
  "Mobile Developer",
  "Cloud Architect",
]

export default function AIInterviewPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInterviewStarted, setIsInterviewStarted] = useState(false)
  const [formData, setFormData] = useState({
    jobRole: "",
    experience: "",
    technologies: [] as string[],
  })

  // Technology selection is now handled by the TechSelector component

  const handleStartInterview = () => {
    if (formData.jobRole && formData.experience && formData.technologies.length > 0) {
      setIsModalOpen(false)
      setIsInterviewStarted(true)
    }
  }

  const handleBackToDashboard = () => {
    setIsInterviewStarted(false)
    setFormData({ jobRole: "", experience: "", technologies: [] })
  }

  if (isInterviewStarted) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header with Session Info and Back Button */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold">AI Interview Session</div>
              <Badge variant="secondary">Live</Badge>
              <div className="text-sm text-muted-foreground">00:05:23</div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleBackToDashboard} className="flex items-center gap-2 hover:bg-accent/30 dark:hover:bg-accent/30 transition-all duration-300">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">AI Interview Session</h1>
              <p className="text-muted-foreground text-lg">
                Practice with our AI interviewer using audio and video
              </p>
            </div>

            {/* Interview Details */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Interview for {formData.jobRole}</CardTitle>
                    <CardDescription>
                      {formData.experience} years experience • Technologies: {formData.technologies.join(", ")}
                    </CardDescription>
                  </div>
                  <Button variant="destructive" size="sm" onClick={handleBackToDashboard} className="bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70 dark:from-destructive/80 dark:to-destructive/60 dark:hover:from-destructive/70 dark:hover:to-destructive/50 shadow-md transition-all duration-300 hover:shadow-destructive/20 dark:shadow-destructive/10 hover:scale-[1.02]">
                    End Interview
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Voice Interview Component */}
            <VoiceInterview 
              jobRole={formData.jobRole} 
              technologies={formData.technologies} 
              onComplete={handleBackToDashboard}
            />
            
            {/* Interview Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Interview Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Speak clearly after the AI finishes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Take your time to think before answering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Use specific examples from your experience</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
  
    )
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        {/* Back to Dashboard Button - Right Corner */}
        <div className="mb-6 flex justify-end">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-accent/30 dark:hover:bg-accent/30 transition-all duration-300 hover:shadow-md">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">AI Mock Interview</h1>
          <p className="text-muted-foreground text-lg">
            Practice with our AI interviewer and get real-time feedback on your performance
          </p>
        </div>

          {/* Interview Setup Card */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <div className="relative">
                  <Mic className="h-8 w-8 text-primary" />
                  <Video className="absolute -top-1 -right-1 h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Ready to Start Your Interview?</CardTitle>
              <CardDescription className="text-base">
                Our AI will conduct a personalized interview based on your job role and experience level
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="px-8 py-3 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 dark:from-primary/80 dark:to-primary/60 dark:hover:from-primary/70 dark:hover:to-primary/50 shadow-lg transition-all duration-300 hover:shadow-primary/20 dark:shadow-primary/10 hover:scale-[1.02]">
                    <Play className="mr-2 h-5 w-5" />
                    Start Interview
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Interview Setup</DialogTitle>
                    <DialogDescription>
                      Please provide some details to customize your interview experience
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* Job Role */}
                    <div className="space-y-2">
                      <Label htmlFor="jobRole">Job Role</Label>
                      <Select
                        value={formData.jobRole}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, jobRole: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a job role" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobRoles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Years of Experience */}
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select years of experience" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 21 }, (_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i === 0 ? "0 (Fresh Graduate)" : `${i} year${i === 1 ? '' : 's'}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <Label>Technologies/Domains (Select multiple)</Label>
                      <TechSelector
                        availableTechnologies={technologies}
                        selectedTechnologies={formData.technologies}
                        onChange={(selected) => setFormData(prev => ({ ...prev, technologies: selected }))}
                      />
                    </div>

                    <Button
                      onClick={handleStartInterview}
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 dark:from-primary/80 dark:to-primary/60 dark:hover:from-primary/70 dark:hover:to-primary/50 shadow-md transition-all duration-300 hover:shadow-primary/20 dark:shadow-primary/10 hover:scale-[1.02]"
                      disabled={!formData.jobRole || !formData.experience || formData.technologies.length === 0}
                    >
                      Start Interview
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="text-center">
                <Mic className="h-8 w-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">Audio Interview</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Practice speaking clearly and confidently with voice-only interviews
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Video className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <CardTitle className="text-lg">Video Interview</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get comfortable with video calls and improve your body language
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Play className="h-8 w-8 mx-auto mb-2 text-accent" />
                <CardTitle className="text-lg">Real-time Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Receive instant analysis of your responses and improvement suggestions
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}
