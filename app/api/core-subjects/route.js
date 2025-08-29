// app/api/core-subjects/route.js
import { NextResponse } from "next/server";

// Dummy core subjects questions (you can expand later)
const coreSubjects = {
  dbms: [
    { id: 1, question: "What is normalization in DBMS?", answer: "Process of organizing data to reduce redundancy." },
    { id: 2, question: "What is a primary key?", answer: "A unique identifier for each record in a table." }
  ],
  os: [
    { id: 1, question: "What is a deadlock in OS?", answer: "A state where processes wait indefinitely for resources." },
    { id: 2, question: "What is virtual memory?", answer: "Memory management technique using disk as extension of RAM." }
  ],
  dsa: [
    { id: 1, question: "What is a linked list?", answer: "A linear data structure where elements point to the next node." },
    { id: 2, question: "What is the time complexity of binary search?", answer: "O(log n)." }
  ],
  cn: [
    { id: 1, question: "What is an IP address?", answer: "A unique identifier for devices on a network." },
    { id: 2, question: "What is TCP/IP model?", answer: "A networking model with 4 layers (Application, Transport, Internet, Network Access)." }
  ]
};

// Handle GET request
export async function GET() {
  return NextResponse.json(coreSubjects);
}
