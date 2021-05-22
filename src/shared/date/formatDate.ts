import { dateFns } from 'src/shared/dateFns'

export const formatDueDate = (date: string): string => {
  const dateObj = new Date(date)

  if (dateFns.isTomorrow(dateObj)) return 'Tomorrow'
  if (dateFns.isThisWeek(dateObj)) return dateFns.format(dateObj, 'EEEE')

  return dateFns.format(dateObj, 'MMM d')
}

export const formatDueTime = (date: string): string =>
  dateFns.format(new Date(date), 'H:mm aaa')

export const formatAttachmentCreatedAt = (date: string): string => {
  if (!date) return ''

  const dateObj = new Date(date)
  const day = dateFns.format(dateObj, 'MMM d')
  const time = dateFns.format(dateObj, 'H:mm aaa')

  return `${day}, at ${time}`
}

export const formatCreatedAt = (date: string): string => {
  if (!date) return ''

  const dateObj = new Date(date)
  const duration = dateFns.intervalToDuration({
    start: new Date(),
    end: dateObj,
  })

  if (duration.days) {
    if (duration.days === 1)
      return `Yesterday at ${dateFns.format(dateObj, 'H:mm aaa')}`

    return `${duration.days} days ago`
  }

  if (duration.hours) {
    const hour = duration.hours === 1 ? 'hour' : 'hours'
    return `${duration.hours} ${hour} ago`
  }
  if (duration.minutes) {
    const minute = duration.minutes === 1 ? 'minute' : 'minutes'
    return `${duration.minutes} ${minute} ago`
  }

  if (Number(duration.seconds) > 30) {
    return `${duration.seconds} seconds ago`
  }

  return 'Just now'
}
