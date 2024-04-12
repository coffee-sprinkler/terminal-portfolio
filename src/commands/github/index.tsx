import configure from '../../../config.json'

const git = configure.github

const createGithub = () => {
  const gitString: string[] = ['<br>']

  gitString.push(git[0])
  gitString.push(git[1])
  gitString.push('<br>')

  return gitString
}

export const GITHUB = createGithub()
