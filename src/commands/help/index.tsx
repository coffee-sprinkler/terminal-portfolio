import configure from '../../../config.json'

const helpObj = configure.help

const createHelp = () => {
  const help: string[] = ['<br>']

  helpObj.forEach((ele) => {
    const SPACE = '&nbsp;'
    let string = ''
    string += SPACE.repeat(3)
    string += "<span class='command'>"
    string += ele[0]
    string += '</span>'
    string += SPACE.repeat(17 - ele[0].length)
    string += ele[1]
    help.push(string)
  })

  help.push('<br>')
  help.push(
    "Press <span class='keys'>[↑][↓]</span> to scroll through your history of commands."
  )
  help.push('<br>')
  return help
}
export const HELP = createHelp()
