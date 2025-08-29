import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Settings, Video, BarChart3, ArrowRight, CheckCircle, User, ChevronDown } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    number: "01",
    title: "Upload Resume",
    description:
      "Upload your resume and get instant ATS compatibility analysis with detailed feedback and improvement suggestions.",
    icon: Upload,
    color: "from-primary to-primary/80",
    features: ["ATS Score Analysis", "Keyword Optimization", "Format Recommendations"],
  },
  {
    number: "02",
    title: "Select Job Preferences",
    description:
      "Choose your target job role, experience level, and relevant technologies to customize your interview experience.",
    icon: Settings,
    color: "from-secondary to-secondary/80",
    features: ["Job Role Selection", "Experience Level", "Technology Stack"],
  },
  {
    number: "03",
    title: "AI Mock Interview",
    description:
      "Practice with our advanced AI interviewer using both audio and video modes for a realistic interview experience.",
    icon: Video,
    color: "from-accent to-accent/80",
    features: ["Audio & Video Practice", "Real-time Questions", "Natural Conversation"],
  },
  {
    number: "04",
    title: "Get Feedback & Reports",
    description:
      "Receive comprehensive analysis with detailed charts, improvement suggestions, and downloadable reports.",
    icon: BarChart3,
    color: "from-primary to-secondary",
    features: ["Performance Analytics", "Skill Assessment", "Improvement Roadmap"],
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 px-6 py-4 border-muted">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-white">
            Mock<span className="gradient-text">Wise</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-muted hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-white">John Doe</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
            <Link href="/">
              <Button variant="ghost" className="rounded-xl hover:bg-muted/50 text-slate-300 hover:text-white">
                Back to Home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="gradient-primary hover:opacity-90 rounded-xl transition-all hover:scale-105 dark:from-primary/90 dark:to-primary/70 hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-primary/30">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-card/50 text-primary border-primary/30 glow-card">✨ Simple 4-Step Process</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            How MockWise
            <span className="block gradient-text">Works</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Our AI-powered platform guides you through a comprehensive interview preparation journey, from resume
            optimization to mock interviews and detailed feedback.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:gap-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {step.number}
                    </div>
                    <h2 className="text-3xl font-bold text-white">{step.title}</h2>
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed">{step.description}</p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        <span className="text-sm font-medium text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Card */}
                <div className="flex-1 max-w-md">
                  <Card className="glow-card glow-hover rounded-xl bg-card border-muted">
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r ${step.color}`}
                      >
                        <step.icon className="h-10 w-10 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{step.title}</CardTitle>
                      <CardDescription className="text-slate-400">Step {step.number} of our process</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3 p-2 bg-muted/20 rounded-lg">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`}></div>
                            <span className="text-sm text-slate-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose MockWise?</h2>
            <p className="text-xl text-slate-300">Comprehensive preparation that gives you the confidence to succeed</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="text-center rounded-xl glow-card bg-card border-muted">
              <CardHeader>
                <div className="mx-auto mb-2 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-white">Personalized Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300">
                  Tailored interviews based on your job role, experience level, and target companies
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center rounded-xl glow-card bg-card border-muted">
              <CardHeader>
                <div className="mx-auto mb-2 w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-white">Detailed Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300">
                  Comprehensive feedback with charts, scores, and specific improvement recommendations
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center rounded-xl glow-card bg-card border-muted">
              <CardHeader>
                <div className="mx-auto mb-2 w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-white">Realistic Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300">
                  AI-powered interviews that simulate real interview conditions and scenarios
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of successful candidates and ace your next interview with confidence
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="gradient-primary hover:opacity-90 rounded-xl px-8 py-4 text-lg transition-all hover:scale-105 glow-hover dark:from-primary/90 dark:to-primary/70 hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-primary/30"
            >
              Start Preparing Now 🚀
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 px-6 py-8 border-muted">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold text-white mb-4">
            Mock<span className="gradient-text">Wise</span>
          </div>
          <p className="text-slate-400">
            © 2024 MockWise. All rights reserved. Built with ❤️ for aspiring professionals.
          </p>
        </div>
      </footer>
    </div>
  )
}
