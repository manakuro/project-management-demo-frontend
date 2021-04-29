import { dateFns } from 'src/shared/dateFns'

export const getDifferenceInDays = (
  laterDate: ArgType<typeof dateFns.differenceInCalendarDays, 0>,
  earlierDate: ArgType<typeof dateFns.differenceInCalendarDays, 1>,
): number => {
  return dateFns.differenceInCalendarDays(laterDate, earlierDate)
}
