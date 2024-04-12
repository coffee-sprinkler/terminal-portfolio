import configure from '../../../config.json'

const aboutJSON = configure.about

const createAbout = (): string[] => {
  const about: string[] = ['<br>']
  aboutJSON.forEach((ele) => {
    about.push(ele)
  })

  about.push('<br>')

  return about
}
export const ABOUT = createAbout()
