import isToday from 'date-fns/isToday'
import isYesterday from 'date-fns/isYesterday'
import isTomorrow from 'date-fns/isTomorrow'
import isThisYear from 'date-fns/isThisYear'
import isThisWeek from 'date-fns/isThisWeek'
import addYears from 'date-fns/addYears'
import getWeek from 'date-fns/getWeek'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import DateIODateFnsAdapter from '@date-io/date-fns'

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
}

export const dateFns = new DateFnsAdapter()
