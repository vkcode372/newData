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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim() === "") return

    // Add user message
    const newMessages = [...messages, { text: inputValue, isUser: true }]
    setMessages(newMessages)
    setInputValue("")
    setSuggestions([])

    // Simulate AI response after a short delay
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          text: `This is a response to: "${inputValue}"`,
          isUser: false,
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
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg max-w-3xl ${
                      message.isUser ? "bg-purple-100 ml-auto" : "bg-white border border-gray-200"
                    }`}
                  >
                    {message.text}
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
