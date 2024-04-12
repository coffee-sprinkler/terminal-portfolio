const createError = () => {
  const errorMessage: string[] = [
    '<br>',
    'COMMAND NOT FOUND!',
    "Type <span class='command'>'help'</span> to get started",
    '<br>',
  ]
  return errorMessage
}
export const ERROR = createError()
