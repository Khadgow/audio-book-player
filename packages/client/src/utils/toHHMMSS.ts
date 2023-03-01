import { format } from 'date-fns'

export const toHHMMSS = (timeInMS: number) => {
  const pureDate = new Date(0)
  pureDate.setHours(0)
  pureDate.setMilliseconds(timeInMS)
  return format(pureDate, 'HH:mm:ss')
}
