"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, Grid, ChevronUp, Plus } from "react-feather"
import "./App.css"

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [toggleAppled, setToggleAppled] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Sample suggestions that appear when the user starts typing
  const possibleSuggestions = [
    "Tell me about EMAAR properties",
    "What are the latest projects?",
    "How can I invest in EMAAR?",
    "Show me floor plans for Dubai Hills Estate",
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
    setToggleAppled(!toggleAppled)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)

    // Show suggestions when user types
    if (e.target.value.length > 0) {
      const filtered = possibleSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      setSuggestions(filtered.length > 0 ? filtered : possibleSuggestions.slice(0, 2))
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
    setSuggestions([])
    inputRef.current.focus()
  }
 const generateStructuredResponse = (userMessage) => {
    // Sample structured response based on user input
    if (userMessage.toLowerCase().includes("property") || userMessage.toLowerCase().includes("project")) {
      return {
        title: "🏢 Latest Emaar Projects in Downtown Dubai",
        content: [
          {
            number: "1",
            title: "St. Regis The Residences",
            details: [
              "Type: 1 to 3-bedroom luxury apartments",
              "Starting Price: AED 2.6 million",
              "Payment Plan: 10/60/30",
              "Highlights: Situated in the Burj Khalifa area, offering premium amenities and services associated with the St. Regis brand.",
            ],
          },
          {
            number: "2",
            title: "Burj Crown",
            details: [
              "Type: 1 to 3-bedroom apartments",
              "Starting Price: AED 2 million",
              "Payment Plan: 10/60/10/20",
              "Highlights: Located near the Dubai Opera, providing residents with vibrant cultural experiences and proximity to major attractions. Metropolitan Premium Properties",
            ],
          },
          {
            number: "3",
            title: "The Address Residences Dubai Opera",
            details: [
              "Type: 1 to 3-bedroom serviced apartments",
              "Starting Price: AED 3 million",
              "Payment Plan: 15/45/20/20",
            ],
          },
        ],
      }
    } else if (userMessage.toLowerCase().includes("technology") || userMessage.toLowerCase().includes("trends")) {
      return {
        title: "💻 Latest EMAAR IT Technology Trends",
        content: [
          {
            number: "1",
            title: "Smart Home Integration",
            details: [
              "IoT-enabled apartments with voice control",
              "Automated lighting and climate systems",
              "Smart security and access control",
              "Energy management systems",
            ],
          },
          {
            number: "2",
            title: "Virtual Reality Tours",
            details: [
              "360-degree property viewing experience",
              "Virtual staging and customization",
              "Remote property consultations",
              "Interactive floor plan exploration",
            ],
          },
          {
            number: "3",
            title: "Blockchain & Digital Payments",
            details: [
              "Cryptocurrency payment options",
              "Digital property ownership records",
              "Smart contracts for transactions",
              "Transparent investment tracking",
            ],
          },
        ],
      }
    } else {
      return {
        title: "ℹ️ EMAAR Information",
        content: [
          {
            number: "1",
            title: "About EMAAR",
            details: [
              "Leading real estate developer in Dubai",
              "Creator of iconic landmarks like Burj Khalifa",
              "Diverse portfolio of residential and commercial projects",
              "Committed to innovation and excellence",
            ],
          },
        ],
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim() === "") return

    const currentTime = getCurrentTime()
    const currentDate = getCurrentDate()

    // Add user message
    const newMessages = [
      ...messages,
      {
        text: inputValue,
        isUser: true,
        time: currentTime,
        date: currentDate,
        id: Date.now(),
      },
    ]
    setMessages(newMessages)
    setInputValue("")
    setSuggestions([])

    // Simulate AI response after a short delay
    setTimeout(() => {
      const structuredResponse = generateStructuredResponse(inputValue)
      setMessages([
        ...newMessages,
        {
          text: inputValue,
          isUser: false,
          time: currentTime,
          date: currentDate,
          structuredContent: structuredResponse,
          id: Date.now() + 1,
        },
      ])
    }, 1000)
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}
      >
        <div className="p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-bold">EM</span>
          </div>
          <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-100">
            <Menu size={20} />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Projects</h2>
          <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
            <Grid size={16} />
            <span className="text-sm">New Project</span>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-4"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} className={`p-1 rounded-md hover:bg-gray-100 ${!toggleAppled && "hidden"}`}>
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-bold">EMAAR</h1>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="font-semibold">Lama Aladham</div>
              <div className="text-xs text-gray-500">Lama.aladham@gmail.com</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Main content area with conditional layout */}
        {messages.length === 0 ? (
          // Empty state with centered content and input
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="mb-16">
              <h2 className="text-4xl font-light text-purple-500 mb-2 text-center">Hello Lama</h2>
              <p className="text-4xl font-light text-gray-400 text-center">How can I help you today?</p>
            </div>

            {/* Centered input form */}
            <div className="w-full max-w-2xl relative">
              {suggestions.length > 0 && (
                <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Ask Something..."
                  className="w-full p-4 pr-24 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <button type="button" className="p-2 rounded-full hover:bg-gray-100">
                    <Plus size={20} />
                  </button>
                  <button type="submit" className="p-2 rounded-full bg-black text-white">
                    <ChevronUp size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          // Chat view with messages and bottom input
          <>
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col">
              <div className="flex-1 space-y-4">
                 {/* Date header */}
                {messages.length > 0 && (
                  <div className="text-center text-sm text-gray-500 py-2">Today, {messages[0]?.time}</div>
                )}

                {messages.map((message, index) => (
                  <div key={message.id} className="space-y-4">
                    {message.isUser ? (
                      // User message
                      <div className="flex justify-end">
                        <div className="max-w-lg">
                          <div className="flex items-center justify-end space-x-2 mb-2">
                            <span className="text-sm font-semibold">Lama Aladham</span>
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                          <div className="bg-purple-100 p-4 rounded-lg">
                            <p className="text-gray-800">{message.text}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // AI response with structured content
                      <div className="max-w-2xl">
                        {message.structuredContent && (
                          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                              {message.structuredContent.title}
                            </h3>

                            <div className="space-y-6">
                              {message.structuredContent.content.map((item, itemIndex) => (
                                <div key={itemIndex} className="space-y-2">
                                  <h4 className="font-semibold text-gray-800">
                                    {item.number}. {item.title}
                                  </h4>
                                  <ul className="space-y-1 ml-4">
                                    {item.details.map((detail, detailIndex) => (
                                      <li key={detailIndex} className="text-gray-600 text-sm leading-relaxed">
                                        • {detail}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area with Suggestions */}
            <div className="p-4 relative">
              {suggestions.length > 0 && (
                <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Ask Something..."
                  className="w-full p-4 pr-24 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <button type="button" className="p-2 rounded-full hover:bg-gray-100">
                    <Plus size={20} />
                  </button>
                  <button type="submit" className="p-2 rounded-full bg-black text-white">
                    <ChevronUp size={20} />
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="p-4 text-center text-sm text-gray-500 border-t border-gray-200">
          © 2025 EMAAR AI. Terms of Use - Privacy Policy
        </footer>
      </div>
    </div>
  )
}

export default App
