import configure from '../../../config.json'

const ascii = configure.ascii
const commands = configure.commands

const createBanner = (): string[] => {
  const banner: string[] = ['<br>']
  ascii.forEach((ele) => {
    let bannerString: string = ''

    for (let i = 0; i < ele.length; i++) {
      if (ele[i] == '') {
        bannerString += '&nbsp;'
      } else {
        bannerString += ele[i]
      }
    }

    const asciiArt = `<pre>${bannerString}</pre>`
    banner.push(asciiArt)
  })

  banner.push('<br>')
  banner.push('Welcome to my Terminal Portfolio')
  banner.push('Here are the list of commands that you can use: ')

  banner.push(
    `[${commands
      .map((commands) => `'<span class="command">${commands}</span>'`)
      .join(', ')}]`
  )

  banner.push('<br>')

  return banner
}
export const BANNER = createBanner()
