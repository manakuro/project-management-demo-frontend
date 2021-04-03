import { dateFns } from 'src/shared/dateFns'

export const formatDueDate = (date: string) => {
  const dateObj = new Date(date)

  if (dateFns.isTomorrow(dateObj)) return 'Tomorrow'
  if (dateFns.isThisWeek(dateObj)) return dateFns.format(dateObj, 'EEEE')

  return dateFns.format(dateObj, 'MMM d')
}

export const formatDueTime = (date: string) => {
  return dateFns.format(new Date(date), 'H:mm aaa')
}

export const isDueDate = (date: string) => {
  return dateFns.isBefore(new Date(), dateFns.addDays(new Date(), 5))
}
