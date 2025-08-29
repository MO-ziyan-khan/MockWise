import { Question, MockQuestion } from '../types'

// Mock questions database
export const mockQuestionsDB: MockQuestion[] = [
  // Data Structures
  {
    question: "What is the time complexity of searching in a balanced Binary Search Tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 1,
    difficulty: "easy",
    explanation: "In a balanced BST, each comparison eliminates half of the remaining nodes, leading to logarithmic time complexity."
  },
  {
    question: "Which data structure follows LIFO principle?",
    options: ["Queue", "Stack", "Tree", "Graph"],
    answer: 1,
    difficulty: "easy",
    explanation: "Stack follows Last In First Out (LIFO) principle where the last element added is the first one to be removed."
  },
  {
    question: "What is the time complexity of inserting an element at the end of a dynamic array?",
    options: ["O(1) amortized", "O(log n)", "O(n)", "O(n²)"],
    answer: 0,
    difficulty: "medium",
    explanation: "Dynamic arrays have O(1) amortized time complexity for insertion at the end, though occasional resizing operations take O(n)."
  },
  {
    question: "Which sorting algorithm has the best worst-case time complexity?",
    options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Insertion Sort"],
    answer: 2,
    difficulty: "medium",
    explanation: "Merge Sort has O(n log n) worst-case time complexity, making it more reliable than Quick Sort which can degrade to O(n²)."
  },
  {
    question: "What is the space complexity of recursive Fibonacci implementation?",
    options: ["O(1)", "O(log n)", "O(n)", "O(2ⁿ)"],
    answer: 2,
    difficulty: "hard",
    explanation: "Recursive Fibonacci has O(n) space complexity due to the call stack depth, not O(2ⁿ) which is the time complexity."
  },
  // Algorithms
  {
    question: "What is the time complexity of binary search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 1,
    difficulty: "easy",
    explanation: "Binary search divides the search space in half with each iteration, resulting in logarithmic time complexity."
  },
  {
    question: "Which algorithm is used to find the shortest path in a weighted graph?",
    options: ["BFS", "DFS", "Dijkstra's", "Kruskal's"],
    answer: 2,
    difficulty: "medium",
    explanation: "Dijkstra's algorithm is designed to find the shortest path between nodes in a weighted graph."
  },
  {
    question: "What is the time complexity of matrix multiplication using the standard algorithm?",
    options: ["O(n²)", "O(n².807)", "O(n³)", "O(n⁴)"],
    answer: 2,
    difficulty: "hard",
    explanation: "Standard matrix multiplication has O(n³) time complexity, though more efficient algorithms like Strassen's can achieve O(n².807)."
  },
  // Database
  {
    question: "What is ACID in database transactions?",
    options: ["Atomicity, Consistency, Isolation, Durability", "Availability, Consistency, Isolation, Durability", "Atomicity, Consistency, Integrity, Durability", "Atomicity, Consistency, Isolation, Distribution"],
    answer: 0,
    difficulty: "easy",
    explanation: "ACID stands for Atomicity, Consistency, Isolation, and Durability - the four key properties that guarantee reliable database transactions."
  },
  {
    question: "Which normal form eliminates transitive dependencies?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    answer: 2,
    difficulty: "medium",
    explanation: "Third Normal Form (3NF) eliminates transitive dependencies by ensuring that non-key attributes don't depend on other non-key attributes."
  },
  {
    question: "What is the time complexity of a B-tree search operation?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 1,
    difficulty: "hard",
    explanation: "B-tree search operations have O(log n) time complexity, making them efficient for large datasets stored on disk."
  },
  // Operating Systems
  {
    question: "What is a deadlock?",
    options: ["A process that never terminates", "A situation where two or more processes are waiting for each other", "A process with high CPU usage", "A memory leak"],
    answer: 1,
    difficulty: "easy",
    explanation: "A deadlock occurs when two or more processes are waiting for each other to release resources, creating a circular wait condition."
  },
  {
    question: "What is the purpose of a page table in virtual memory?",
    options: ["To store program instructions", "To map virtual addresses to physical addresses", "To manage file systems", "To handle interrupts"],
    answer: 1,
    difficulty: "medium",
    explanation: "Page tables map virtual addresses used by programs to physical addresses in RAM, enabling virtual memory management."
  },
  {
    question: "Which scheduling algorithm provides the shortest average waiting time?",
    options: ["First Come First Serve", "Shortest Job First", "Round Robin", "Priority Scheduling"],
    answer: 1,
    difficulty: "hard",
    explanation: "Shortest Job First (SJF) provides the shortest average waiting time by prioritizing shorter jobs, though it can lead to starvation of longer jobs."
  }
]

export function getQuestions(subject: string, count: number, difficulty: string): Question[] {
  // Filter questions by subject and difficulty
  let filteredQuestions = mockQuestionsDB.filter(q => 
    q.difficulty === difficulty
  )

  // If we don't have enough questions for the selected difficulty, add questions from other difficulties
  if (filteredQuestions.length < count) {
    const otherQuestions = mockQuestionsDB.filter(q => 
      q.difficulty !== difficulty
    )
    filteredQuestions = [...filteredQuestions, ...otherQuestions]
  }

  // Remove duplicates based on question text
  const uniqueQuestions = filteredQuestions.filter((q, index, self) => 
    index === self.findIndex(t => t.question === q.question)
  )

  // Return the requested number of questions
  return uniqueQuestions.slice(0, count)
}

export async function generateQuestionsWithAI(subject: string, count: number, difficulty: string): Promise<Question[]> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Gemini API key not found, falling back to mock questions");
      return [];
    }

    const prompt = `Generate ${count} unique multiple-choice questions about ${subject} at ${difficulty} difficulty level. 
    Each question should have 4 options (A, B, C, D) with only one correct answer.
    Include a brief explanation for each correct answer.
    Return the response as a valid JSON array with this exact format:
    [
      {
        "question": "Question text here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "answer": 0,
        "difficulty": "${difficulty}",
        "explanation": "Brief explanation of why this is correct"
      }
    ]
    
    Make sure the questions are relevant to ${subject} and appropriate for ${difficulty} level. 
    The answer field should be 0, 1, 2, or 3 corresponding to options A, B, C, or D respectively.`;

    const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
    let lastError = null;

    for (const model of models) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 2048 }
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.warn(`API Error Response: "${errorText}"`);
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text;
        
        // Extract JSON from the response
        const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
          throw new Error('No valid JSON found in AI response');
        }

        const questions = JSON.parse(jsonMatch[0]);
        
        if (Array.isArray(questions) && questions.length > 0) {
          return questions.slice(0, count);
        }
        
        throw new Error('Invalid AI response format');
      } catch (modelError) {
        console.warn(`Model ${model} failed:`, modelError);
        lastError = modelError;
        continue;
      }
    }
    
    throw lastError || new Error('All Gemini models failed');
  } catch (error) {
    console.error('AI API request failed:', error);
    return [];
  }
}
