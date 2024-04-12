import React, { ChangeEvent, useEffect, useState } from 'react'

interface PromptProps {
  commands: string[]
  onCommand: (command: string) => void
  inputRef: React.RefObject<HTMLInputElement>
  history: string[]
}

const Prompt: React.FC<PromptProps> = ({ onCommand, inputRef, history }) => {
  const [inputValue, setInputValue] = useState('')
  const [historyIndex, setHistoryIndex] = useState<number>(-1)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const command = inputValue.trim()
      setInputValue('')
      setHistoryIndex(-1) // Reset history index
      onCommand(command)
    } else if (event.key === 'ArrowUp') {
      if (history.length > 0) {
        if (historyIndex < history.length - 1) {
          setHistoryIndex((prevIndex) => prevIndex + 1)
        } else if (historyIndex === history.length - 1) {
          // If at the last item, loop back to the first item
          setHistoryIndex(0)
        }
      }
    } else if (event.key === 'ArrowDown') {
      if (history.length > 0) {
        if (historyIndex >= 0) {
          setHistoryIndex((prevIndex) => prevIndex - 1)
        } else if (historyIndex === -1) {
          // If at the first item, loop to the last item
          setHistoryIndex(history.length - 1)
        }
      }
    }
  }

  useEffect(() => {
    if (historyIndex !== -1) {
      setInputValue(history[history.length - 1 - historyIndex])
    } else {
      setInputValue('')
    }
  }, [historyIndex, history])

  return (
    <>
      <div className='prompt'>
        <p>
          <span className='user'>visitor</span>@
          <span className='domain'>coffee.sprinkler</span> ~ $&nbsp;
          <input
            type='text'
            name='prompt'
            id='prompt'
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            ref={inputRef}
          />
        </p>
      </div>
    </>
  )
}

export default Prompt
