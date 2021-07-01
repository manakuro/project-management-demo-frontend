import DateIODateFnsAdapter from '@date-io/date-fns'
import addYears from 'date-fns/addYears'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import getWeek from 'date-fns/getWeek'
import intervalToDuration from 'date-fns/intervalToDuration'
import isThisWeek from 'date-fns/isThisWeek'
import isThisYear from 'date-fns/isThisYear'
import isToday from 'date-fns/isToday'
import isTomorrow from 'date-fns/isTomorrow'
import isYesterday from 'date-fns/isYesterday'
import subDays from 'date-fns/subDays'

class DateFnsAdapter extends DateIODateFnsAdapter {
  isToday(date: ArgType<typeof isToday, 0>) {
    return isToday(date)
  }
  isTomorrow(date: ArgType<typeof isTomorrow, 0>) {
    return isTomorrow(date)
  }
  isYesterday(date: ArgType<typeof isYesterday, 0>) {
    return isYesterday(date)
  }
  isThisYear(date: ArgType<typeof isThisYear, 0>) {
    return isThisYear(date)
  }
  isThisWeek(date: ArgType<typeof isThisWeek, 0>) {
    return isThisWeek(date)
  }
  getWeek(
    date: ArgType<typeof getWeek, 0>,
    options: ArgType<typeof getWeek, 1>,
  ) {
    return getWeek(date, options)
  }
  addYears(
    date: ArgType<typeof addYears, 0>,
    amount: ArgType<typeof addYears, 1>,
  ) {
    return addYears(date, amount)
  }
  differenceInCalendarDays(
    dateLeft: ArgType<typeof differenceInCalendarDays, 0>,
    dateRight: ArgType<typeof differenceInCalendarDays, 1>,
  ) {
    return differenceInCalendarDays(dateLeft, dateRight)
  }
  intervalToDuration(interval: ArgType<typeof intervalToDuration, 0>) {
    return intervalToDuration(interval)
  }
  subDays(
    date: ArgType<typeof subDays, 0>,
    amount: ArgType<typeof subDays, 1>,
  ) {
    return subDays(date, amount)
  }
}

export const dateFns = new DateFnsAdapter()
