import { dateFns } from 'src/shared/dateFns'

export const formatDueDate = (date: string) => {
  return dateFns.format(new Date(date), 'EEEE')
}

export const isDueDate = (date: string) => {
  return dateFns.isBefore(new Date(), dateFns.addDays(new Date(), 5))
}
