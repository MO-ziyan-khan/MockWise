"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import { ArrowLeft, Download, TrendingUp, Award, Target, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts"

const skillsData = [
  { skill: "Communication", score: 85, fullMark: 100 },
  { skill: "Technical", score: 78, fullMark: 100 },
  { skill: "Problem-Solving", score: 82, fullMark: 100 },
  { skill: "Confidence", score: 72, fullMark: 100 },
]

const strengthsWeaknessesData = [
  { name: "Strong Areas", value: 65, color: "#10b981" },
  { name: "Weak Areas", value: 35, color: "#f59e0b" },
]

const progressData = [
  { attempt: 1, score: 6.2, date: "2024-01-15" },
  { attempt: 2, score: 7.1, date: "2024-01-22" },
  { attempt: 3, score: 7.8, date: "2024-01-29" },
  { attempt: 4, score: 8.2, date: "2024-02-05" },
  { attempt: 5, score: 8.5, date: "2024-02-12" },
]

const subjectPerformanceData = [
  { subject: "DSA", score: 85 },
  { subject: "System Design", score: 72 },
  { subject: "DBMS", score: 88 },
  { subject: "Networks", score: 76 },
  { subject: "OS", score: 82 },
]

const recentInterviews = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "TechCorp",
    date: "2024-02-05",
    score: 8.2,
    status: "Excellent",
    duration: "45 min",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "StartupXYZ",
    date: "2024-01-29",
    score: 7.8,
    status: "Good",
    duration: "38 min",
  },
  {
    id: 3,
    role: "React Developer",
    company: "WebSolutions",
    date: "2024-01-22",
    score: 7.1,
    status: "Good",
    duration: "42 min",
  },
]

export default function ReportsPage() {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      Excellent: "bg-green-100 text-green-800",
      Good: "bg-yellow-100 text-yellow-800",
      "Needs Improvement": "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        {/* Back to Dashboard Button - Right Corner */}
        <div className="mb-6 flex justify-end">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Performance Reports</h1>
          <p className="text-muted-foreground">Comprehensive analysis of your interview performance and progress</p>
        </div>

        {/* Export Button */}
        <div className="mb-6 flex justify-end">
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All Reports
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-6">
          <Card className="shadow-lg rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    <Award className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className="text-2xl font-bold text-indigo-600">8.2/10</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          <Card className="shadow-lg rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <Calendar className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Interviews</p>
                    <p className="text-2xl font-bold text-emerald-600">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          <Card className="shadow-lg rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-xl">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Practice Hours</p>
                    <p className="text-2xl font-bold text-yellow-600">24.5</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          <Card className="shadow-lg rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border-pink-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-pink-100 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Improvement</p>
                    <p className="text-2xl font-bold text-pink-600">+32%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
            {/* Skills Radar Chart */}
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Skills Assessment
                </CardTitle>
                <CardDescription>Performance across key interview areas</CardDescription>
              </CardHeader>
              <CardContent className="">
                <ChartContainer config={{ score: { label: "Score" } }}>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart data={skillsData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: "#64748b" }} />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fontSize: 10, fill: "#64748b" }}
                        tickCount={5}
                      />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="url(#radarGradient)"
                        fill="url(#radarFill)"
                        fillOpacity={0.4}
                        strokeWidth={3}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Score"]}
                        content={<ChartTooltipContent />}
                      />
                      <defs>
                        <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                        <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
                        </linearGradient>
                      </defs>
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Performance Distribution */}
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
                <CardDescription>Strong vs Weak Areas breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ "Strong Areas": { label: "Strong Areas" }, "Weak Areas": { label: "Weak Areas" } }}>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={strengthsWeaknessesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {strengthsWeaknessesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Percentage"]}
                        content={<ChartTooltipContent />}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ paddingTop: "20px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Progress Over Time - Full Width */}
          <Card className="mb-6 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Progress Over Time
              </CardTitle>
              <CardDescription>Your improvement journey across interview attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ score: { label: "Score" } }}>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="attempt"
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      tickLine={{ stroke: "#e2e8f0" }}
                      label={{ value: "Interview Attempts", position: "insideBottom", offset: -10 }}
                    />
                    <YAxis
                      domain={[0, 10]}
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      tickLine={{ stroke: "#e2e8f0" }}
                      label={{ value: "Score", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}/10`, "Score"]}
                      labelFormatter={(label) => {
                        const item = progressData.find((d) => d.attempt === label)
                        return `Interview ${label} (${item?.date})`
                      }}
                      content={<ChartTooltipContent />}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="url(#lineGradient)"
                      strokeWidth={4}
                      dot={{ fill: "#6366f1", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: "#6366f1", strokeWidth: 2, fill: "white" }}
                    />
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

        {/* Subject Performance and Recent Interviews */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
            {/* Subject Performance Bar Chart */}
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Your scores across different technical subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ score: { label: "Score" } }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="subject"
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={{ stroke: "#e2e8f0" }}
                        tickLine={{ stroke: "#e2e8f0" }}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        axisLine={{ stroke: "#e2e8f0" }}
                        tickLine={{ stroke: "#e2e8f0" }}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Score"]}
                        content={<ChartTooltipContent />}
                      />
                      <Bar dataKey="score" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Recent Interviews */}
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Recent Interviews
                </CardTitle>
                <CardDescription>Your latest interview performances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{interview.role}</h4>
                          <Badge className={`text-xs ${getStatusBadge(interview.status)}`}>{interview.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {interview.company} • {interview.date}
                        </p>
                        <p className="text-xs text-muted-foreground">{interview.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getScoreColor(interview.score)}`}>
                          {interview.score}/10
                        </div>
                        <Link href="/dashboard/feedback">
                          <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}
