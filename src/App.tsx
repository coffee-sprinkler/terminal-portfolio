import { useState, useEffect, useRef } from 'react'

import Head from './components/Head'
import Terminal from './components/Terminal'
import Prompt from './components/Prompt'

import { BANNER } from './commands/banner'
import { ERROR } from './commands/default'

import configure from '../config.json'
import { HELP } from './commands/help'
import { ABOUT } from './commands/about'
import { PROJECTS } from './commands/projects'
import { WHOAMI } from './commands/whoami'
import { GITHUB } from './commands/github'

const commands = configure.commands

function App() {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [firstMount, setFirstMount] = useState(true)
  const isMounted = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [history, setHistory] = useState<string[]>([])

  const clear = () => {
    setTerminalOutput([])
    setHistory([])
    inputRef.current?.removeAttribute('disabled')
    inputRef.current?.focus()
    console.clear()
  }

  const close = () => {
    const confirmation = window.confirm(
      'Are you sure you want to close the tab?'
    )

    if (confirmation) {
      window.close()
    } else {
      if (inputRef.current) {
        inputRef.current.removeAttribute('disabled')
        inputRef.current.focus()
      }
    }
  }

  const goToGithub = () => {
    setTimeout(() => {
      window.open(GITHUB[2], '_blank')
    }, 1250)
  }

  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    document.body.addEventListener('click', handleClick)

    return () => {
      document.body.removeEventListener('click', handleClick)
    }
  }, [inputRef])

  const executeCommand = (command: string) => {
    const delayBetweenLines = 60
    let output: string[] = []

    let promptCommand = command

    if (firstMount && command === 'banner') {
      promptCommand = ''
    }

    const promptLine = `
        <p>
          <span class='user'>visitor</span>@<span class='domain'>coffee.sprinkler</span> ~ $&nbsp;<span class='command'>${promptCommand}</span>
        </p>`
    output.push(promptLine)

    if (command.trim() === '') {
      setTerminalOutput([...terminalOutput, ...output])
      setFirstMount(false)
      return
    }

    if (isMounted.current && !history.includes(command)) {
      setHistory((prevHistory) => [...prevHistory, command])
    }

    inputRef.current?.setAttribute('disabled', 'true')

    switch (command) {
      case 'about':
        output = output.concat(ABOUT)
        break

      case 'banner':
        output = output.concat(BANNER)
        break

      case 'github':
        output = output.concat(GITHUB)
        goToGithub()
        break

      case 'help':
        output = output.concat(HELP)
        break

      case 'whoami':
        output = output.concat(WHOAMI)
        break

      case 'projects':
        output = output.concat(PROJECTS)
        break

      case 'exit':
        close()
        return

      case 'clear':
        clear()
        return

      default:
        output = output.concat(ERROR)
        break
    }

    output.forEach((line, index) => {
      setTimeout(() => {
        setTerminalOutput((prevOutput) => [...prevOutput, line])
        if (index === output.length - 1) {
          inputRef.current?.removeAttribute('disabled')
          inputRef.current?.focus()
        }
      }, index * delayBetweenLines)
    })
    setFirstMount(false)
  }

  useEffect(() => {
    if (!isMounted.current) {
      executeCommand('banner')
      isMounted.current = true
    }
  }, [])

  return (
    <>
      <Head />
      <Terminal output={terminalOutput} />
      <Prompt
        commands={commands}
        onCommand={executeCommand}
        inputRef={inputRef}
        history={history}
      />
    </>
  )
}

export default App
