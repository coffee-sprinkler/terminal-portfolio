import configure from '../../../config.json'

const whoami = configure.whoami

const createWhoAmI = () => {
  const whoAmIString: string[] = ['<br>']

  whoami.forEach((who) => {
    if (who === '') whoAmIString.push('<br>')
    whoAmIString.push(who)
  })

  whoAmIString.push('<br>')

  return whoAmIString
}
export const WHOAMI = createWhoAmI()
