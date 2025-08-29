"use client"

import React, { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Download,
  RefreshCw,
  Target,
  TrendingUp,
  Award,
} from "lucide-react"
import Link from "next/link"

const mockAnalysisData = {
  atsScore: 78,
  overallRating: "Good",
  strengths: [
    "Strong technical skills section",
    "Relevant work experience",
    "Clear project descriptions",
    "Proper formatting and structure",
    "Quantified achievements",
  ],
  weaknesses: [
    "Missing keywords for target role",
    "No summary/objective section",
    "Limited soft skills mentioned",
    "Could improve action verbs",
  ],
  suggestions: [
    {
      category: "Keywords",
      title: "Add Industry Keywords",
      description: "Include more relevant keywords like 'React', 'Node.js', 'Agile' to improve ATS compatibility",
      priority: "High",
    },
    {
      category: "Structure",
      title: "Add Professional Summary",
      description: "Include a 2-3 line summary at the top highlighting your key qualifications",
      priority: "Medium",
    },
    {
      category: "Content",
      title: "Quantify More Achievements",
      description: "Add specific numbers and metrics to demonstrate impact (e.g., 'Improved performance by 25%')",
      priority: "High",
    },
    {
      category: "Skills",
      title: "Highlight Soft Skills",
      description: "Include leadership, communication, and teamwork skills relevant to the role",
      priority: "Low",
    },
  ],
}

export default function ResumeAnalyzerPage() {
  const [isUploaded, setIsUploaded] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [fileName, setFileName] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setIsAnalyzing(true)
      // Simulate analysis delay
      setTimeout(() => {
        setIsAnalyzing(false)
        setIsUploaded(true)
      }, 3000)
    }
  }

  const handleNewUpload = () => {
    setIsUploaded(false)
    setIsAnalyzing(false)
    setFileName("")
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-600"
    if (score >= 60) return "bg-yellow-600"
    return "bg-red-600"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isAnalyzing) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-2xl">
          {/* Back to Dashboard Button - Right Corner */}
          <div className="mb-6 flex justify-end">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="text-center py-12">
              <RefreshCw className="h-12 w-12 mx-auto mb-4 text-primary animate-spin" />
              <h2 className="text-2xl font-bold mb-2">Analyzing Your Resume</h2>
              <p className="text-muted-foreground mb-4">
                Our AI is reviewing "{fileName}" and generating detailed insights...
              </p>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
              </div>
              <p className="text-sm text-muted-foreground">This usually takes 30-60 seconds</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isUploaded) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header with New Upload Button and Back to Dashboard */}
          <div className="mb-6 flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={handleNewUpload}>
              <Upload className="h-4 w-4 mr-2" />
              New Upload
            </Button>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">Resume Analysis Complete</h1>
              <p className="text-muted-foreground text-lg">
                Detailed insights and recommendations for "{fileName}"
              </p>
            </div>

            {/* ATS Score Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  ATS Compatibility Score
                </CardTitle>
                <CardDescription>How well your resume performs with Applicant Tracking Systems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${mockAnalysisData.atsScore}, 100`}
                        className={getScoreColor(mockAnalysisData.atsScore)}
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="100, 100"
                        className="text-muted"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(mockAnalysisData.atsScore)}`}>
                          {mockAnalysisData.atsScore}
                        </div>
                        <div className="text-sm text-muted-foreground">out of 100</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Overall Rating</span>
                        <Badge className={getPriorityColor("Medium")}>{mockAnalysisData.overallRating}</Badge>
                      </div>
                      <Progress value={mockAnalysisData.atsScore} className="h-2" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your resume has good ATS compatibility but could benefit from keyword optimization and structural
                      improvements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    Key Strengths
                  </CardTitle>
                  <CardDescription>What your resume does well</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalysisData.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weaknesses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-700">
                    <AlertTriangle className="h-5 w-5" />
                    Areas for Improvement
                  </CardTitle>
                  <CardDescription>Issues that could impact your success</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalysisData.weaknesses.map((weakness, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{weakness}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Suggestions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Improvement Suggestions
                </CardTitle>
                <CardDescription>Actionable recommendations to enhance your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {mockAnalysisData.suggestions.map((suggestion, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{suggestion.title}</CardTitle>
                          <Badge className={getPriorityColor(suggestion.priority)} variant="secondary">
                            {suggestion.priority}
                          </Badge>
                        </div>
                        <Badge variant="outline" className="w-fit text-xs">
                          {suggestion.category}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button size="lg" onClick={handleNewUpload}>
                <Upload className="mr-2 h-5 w-5" />
                Analyze Another Resume
              </Button>
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Download Report
              </Button>
            </div>
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
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Resume Analyzer</h1>
          <p className="text-muted-foreground text-lg">
            Get instant ATS score analysis and detailed feedback to improve your resume
          </p>
        </div>

          {/* Upload Card */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Upload Your Resume</CardTitle>
              <CardDescription className="text-base">
                Upload your resume in PDF or DOCX format for comprehensive analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Drop your resume here or click to browse</p>
                  <p className="text-sm text-muted-foreground mb-4">Supports PDF, DOC, and DOCX files up to 10MB</p>
                </label>
                <Button onClick={() => inputRef.current && inputRef.current.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">ATS Score</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get a detailed compatibility score showing how well your resume performs with ATS systems
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <CardTitle className="text-lg">Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Identify strengths, weaknesses, and get specific recommendations for improvement
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-accent" />
                <CardTitle className="text-lg">Professional Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Receive recruiter-style feedback to make your resume stand out from the competition
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}
