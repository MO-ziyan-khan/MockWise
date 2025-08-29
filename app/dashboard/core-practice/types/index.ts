export interface Question {
  question: string
  options: string[]
  answer: number
  difficulty: string
  explanation: string
}

export interface Subject {
  id: string
  name: string
  description: string
}

export interface DifficultyLevel {
  value: string
  label: string
  bgColor: string
  color: string
}

export interface MockQuestion {
  question: string
  options: string[]
  answer: number
  difficulty: string
  explanation: string
}
