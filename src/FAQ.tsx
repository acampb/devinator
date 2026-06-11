import { useState } from 'react'
import './FAQ.css'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'What is this Todo app?',
    answer: 'This is a simple Todo application built with React and TypeScript. It allows you to create and manage a list of tasks to keep track of what needs to be done.'
  },
  {
    question: 'How do I add a new todo?',
    answer: 'Simply type your todo in the input field and press Enter, or click the "Add" button. Your new todo will appear in the list below.'
  },
  {
    question: 'Can I delete or edit todos?',
    answer: 'In the current version, todos are displayed in a simple list. Future updates may include edit and delete functionality.'
  },
  {
    question: 'Is my data saved?',
    answer: 'Currently, todos are stored in the browser\'s memory. If you refresh the page, your todos will be cleared. Future versions may include local storage or cloud sync.'
  },
  {
    question: 'What are the different pricing plans?',
    answer: 'Check out the Pricing page to see our available plans and features. We offer options for individuals and teams of all sizes.'
  },
  {
    question: 'Who built this?',
    answer: 'This is an agentic validation testbed created to demonstrate modern web development practices using React, TypeScript, and Vite.'
  }
]

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <main className="faq-container">
      <header style={{ marginBottom: '2rem' }}>
        <h1>Frequently Asked Questions</h1>
        <p className="faq-subtitle">Find answers to common questions about our app</p>
      </header>

      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${expandedIndex === index ? 'expanded' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleExpanded(index)}
              aria-expanded={expandedIndex === index}
            >
              <span>{item.question}</span>
              <span className="faq-toggle">
                {expandedIndex === index ? '−' : '+'}
              </span>
            </button>
            {expandedIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
