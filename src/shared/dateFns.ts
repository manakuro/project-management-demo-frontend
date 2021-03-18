import isToday from 'date-fns/isToday'
import isYesterday from 'date-fns/isYesterday'
import isThisYear from 'date-fns/isThisYear'
import isThisWeek from 'date-fns/isThisWeek'
import getWeek from 'date-fns/getWeek'
import DateIODateFnsAdapter from '@date-io/date-fns'

class DateFnsAdapter extends DateIODateFnsAdapter {
  isToday(date: Parameters<typeof isToday>[0]) {
    return isToday(date)
  }
  isYesterday(date: Parameters<typeof isYesterday>[0]) {
    return isYesterday(date)
  }
  isThisYear(date: Parameters<typeof isThisYear>[0]) {
    return isThisYear(date)
  }
  isThisWeek(date: Parameters<typeof isThisWeek>[0]) {
    return isThisWeek(date)
  }
  getWeek(
    date: Parameters<typeof getWeek>[0],
    options: Parameters<typeof getWeek>[1],
  ) {
    return getWeek(date, options)
  }
}

export const dateFns = new DateFnsAdapter()
