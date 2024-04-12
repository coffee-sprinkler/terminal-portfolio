import React, { useEffect } from 'react'

interface TerminalProps {
  output: string[]
}

const Terminal: React.FC<TerminalProps> = ({ output }) => {
  const [firstLine, ...restLines] = output

  useEffect(() => {
    scrollUp()
  }, [output])

  const scrollUp = () => {
    const mainWrapper = document.querySelector('main')

    if (!mainWrapper) return

    mainWrapper.scrollTop = mainWrapper.scrollHeight
  }

  return (
    <div className='terminal'>
      <div
        className='history'
        dangerouslySetInnerHTML={{ __html: firstLine }}
      />
      {restLines.map((line, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
      ))}
    </div>
  )
}

export default Terminal
