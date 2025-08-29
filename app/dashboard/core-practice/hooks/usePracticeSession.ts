import { useState, useEffect } from 'react'
import { Question } from '../types'
import { getQuestions, generateQuestionsWithAI } from '../utils/questionUtils'

export function usePracticeSession(
  isPracticeStarted: boolean,
  selectedSubject: string,
  questionCount: string,
  difficulty: string
) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timer, setTimer] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isSessionEnded, setSessionEnded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAIGenerated, setIsAIGenerated] = useState(false)

  // Generate questions when practice starts
  useEffect(() => {
    if (isPracticeStarted && selectedSubject && questionCount && difficulty) {
      setIsLoading(true)
      
      const generateQuestions = async () => {
        try {
          // Try AI generation first
          let qs = await generateQuestionsWithAI(selectedSubject, parseInt(questionCount), difficulty)
          
          if (qs.length > 0) {
            setIsAIGenerated(true)
          } else {
            // Fallback to mock questions
            qs = getQuestions(selectedSubject, parseInt(questionCount), difficulty)
            setIsAIGenerated(false)
          }

          // Check if we got the requested number of questions
          if (qs.length > 0) {
            setQuestions(qs)
            setCurrentQuestion(0)
            setAnswers(new Array(qs.length).fill(null))
            setSessionEnded(false)
            // Timer will be set based on difficulty level (Easy: 30s, Medium: 60s, Hard: 90s)
            
            // Simulate a small delay to ensure state updates properly
            setTimeout(() => {
              setIsLoading(false)
            }, 100)
          } else {
            // Fallback to mock questions
            const qs = getQuestions(selectedSubject, parseInt(questionCount), difficulty)
            setQuestions(qs)
            setAnswers(Array(qs.length).fill(null))
            setSessionEnded(false)
            setIsLoading(false)
          }
          
        } catch (error) {
          console.error('Error generating questions:', error)
          // Fallback to mock questions
          const qs = getQuestions(selectedSubject, parseInt(questionCount), difficulty)
          setQuestions(qs)
          setAnswers(Array(qs.length).fill(null))
          setSessionEnded(false)
          setIsLoading(false)
        }
      }

      generateQuestions()
    }
  }, [isPracticeStarted, questionCount, selectedSubject, difficulty])

  // Timer effect - reset based on difficulty level for each question
  useEffect(() => {
    if (isPracticeStarted && questions.length > 0 && !isLoading) {
      let questionTime = 30 // Default for Easy
      
      if (difficulty === 'medium') {
        questionTime = 60 // 1 minute for Medium
      } else if (difficulty === 'hard') {
        questionTime = 90 // 1:30 for Hard
      }
      
      setTimeLeft(questionTime)
      setTimer(questionTime)
      
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            // Mark current question as unanswered if not attempted
            if (answers[currentQuestion] === null) {
              const newAnswers = [...answers]
              newAnswers[currentQuestion] = -1 // -1 indicates unanswered
              setAnswers(newAnswers)
            }
            
            // Go to next question instead of ending session
            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion(currentQuestion + 1)
              return questionTime // Reset timer for next question
            } else {
              // Only end session if it's the last question
              setSessionEnded(true)
              return 0
            }
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [currentQuestion, isPracticeStarted, questions.length, isLoading, difficulty, answers])

  // Function to check if a question is locked (answered or time's up)
  const isQuestionLocked = (questionIndex: number) => {
    return answers[questionIndex] !== null // Question is locked if it has any answer (including -1 for unanswered)
  }

  // Function to check if current question can be answered
  const canAnswerCurrentQuestion = () => {
    return !isQuestionLocked(currentQuestion)
  }

  const handleSelectOption = (optionIndex: number) => {
    // Prevent answering if question is already locked
    if (isQuestionLocked(currentQuestion)) {
      return
    }
    
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      // Find the previous question that hasn't been answered yet
      let prevQuestion = currentQuestion - 1
      while (prevQuestion >= 0 && isQuestionLocked(prevQuestion)) {
        prevQuestion--
      }
      
      // Only go back if we found an unanswered question
      if (prevQuestion >= 0) {
        setCurrentQuestion(prevQuestion)
      }
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      // Find the next question that hasn't been answered yet
      let nextQuestion = currentQuestion + 1
      while (nextQuestion < questions.length && isQuestionLocked(nextQuestion)) {
        nextQuestion++
      }
      
      // Only go forward if we found an unanswered question
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion)
      }
    }
  }

  const handleEnd = () => setSessionEnded(true)

  const handleRestart = () => {
    setQuestions([])
    setCurrentQuestion(0)
    setAnswers([])
    setTimer(0)
    setTimeLeft(0)
    setSessionEnded(false)
    setIsLoading(false)
    setIsAIGenerated(false)
  }

  // Helper functions to check for unanswered questions
  const hasUnansweredQuestionsBefore = () => {
    for (let i = 0; i < currentQuestion; i++) {
      if (answers[i] === null) {
        return true
      }
    }
    return false
  }

  const hasUnansweredQuestionsAfter = () => {
    for (let i = currentQuestion + 1; i < questions.length; i++) {
      if (answers[i] === null) {
        return true
      }
    }
    return false
  }

  return {
    questions,
    currentQuestion,
    answers,
    timer,
    timeLeft,
    isSessionEnded,
    isLoading,
    isAIGenerated,
    isQuestionLocked,
    canAnswerCurrentQuestion,
    handleSelectOption,
    handlePrev,
    handleNext,
    handleEnd,
    handleRestart,
    hasUnansweredQuestionsBefore,
    hasUnansweredQuestionsAfter
  }
}
