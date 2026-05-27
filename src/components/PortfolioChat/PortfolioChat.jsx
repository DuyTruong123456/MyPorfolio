import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi'
import { getPortfolioReply, suggestedQuestions } from '../../utils/portfolioAssistant'
import { site } from '../../data/portfolio'

const WELCOME = `Hey! I'm here to answer questions about ${site.name.split(' ').pop()}'s portfolio — skills, apps, experience, and contact info.`

function createMessage(role, text) {
  return { id: crypto.randomUUID(), role, text }
}

export default function PortfolioChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(() => [
    createMessage('assistant', WELCOME),
  ])
  const listRef = useRef(null)

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, open])

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    setMessages((prev) => [...prev, createMessage('user', trimmed)])
    setInput('')

    window.setTimeout(() => {
      const reply = getPortfolioReply(trimmed)
      setMessages((prev) => [...prev, createMessage('assistant', reply)])
    }, 450)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <div className={`portfolio-chat ${open ? 'portfolio-chat--open' : ''}`}>
      <AnimatePresence>
        {open && (
          <motion.section
            className="portfolio-chat__panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            aria-label="Portfolio assistant chat"
          >
            <header className="portfolio-chat__header">
              <div>
                <p className="portfolio-chat__title">Portfolio guide</p>
                <p className="portfolio-chat__subtitle">Ask about skills, projects & experience</p>
              </div>
              <button
                type="button"
                className="portfolio-chat__icon-btn"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <FiX />
              </button>
            </header>

            <div className="portfolio-chat__messages" ref={listRef}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`portfolio-chat__bubble portfolio-chat__bubble--${msg.role}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="portfolio-chat__suggestions">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="portfolio-chat__chip"
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>

            <form className="portfolio-chat__form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about my work, projects…"
                aria-label="Chat message"
                autoComplete="off"
              />
              <button
                type="submit"
                className="portfolio-chat__icon-btn portfolio-chat__icon-btn--send"
                aria-label="Send message"
                disabled={!input.trim()}
              >
                <FiSend />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="portfolio-chat__launcher"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Minimize portfolio chat' : 'Open portfolio chat'}
        aria-expanded={open}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        {open ? <FiX /> : <FiMessageCircle />}
        <span>{open ? 'Close' : 'Ask me'}</span>
      </motion.button>
    </div>
  )
}
