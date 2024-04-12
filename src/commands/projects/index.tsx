import configure from '../../../config.json'

const proj = configure.projects

const createProject = () => {
  if (!proj || !proj[0])
    return [
      '<br>',
      'No projects available at the moment. Check back soon for updates!',
      '<br>',
    ]

  const projects: string[] = ['<br>']

  proj.forEach((pro) => {
    projects.push(pro)
  })

  return projects
}
export const PROJECTS = createProject()
