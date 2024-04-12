import terminalLogo from '/terminal.png'

const Head = () => {
  return (
    <>
      <div className='header'>
        <div className='top'>
          <img src={terminalLogo} width={20} alt='logo' />
          <span>DOTDENZ/c/Users/visitor</span>
        </div>
        <div className='bar first'></div>
        <div className='bar last'></div>
      </div>
      <br />
    </>
  )
}
export default Head
