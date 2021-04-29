import { dateFns } from 'src/shared/dateFns'

export const formatDueDate = (date: string): string => {
  const dateObj = new Date(date)

  if (dateFns.isTomorrow(dateObj)) return 'Tomorrow'
  if (dateFns.isThisWeek(dateObj)) return dateFns.format(dateObj, 'EEEE')

  return dateFns.format(dateObj, 'MMM d')
}

export const formatDueTime = (date: string): string => {
  return dateFns.format(new Date(date), 'H:mm aaa')
}
