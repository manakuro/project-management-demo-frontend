import React from 'react'
import { TextField } from '@material-ui/core'
import StaticDatePicker, {
  StaticDatePickerProps,
} from '@material-ui/lab/StaticDatePicker'

type Props = Omit<StaticDatePickerProps, 'renderInput' | 'openTo'>

const DatePicker: React.VFC<Props> = (props) => {
  return (
    <StaticDatePicker
      displayStaticWrapperAs="desktop"
      openTo="date"
      {...props}
      renderInput={(params) => <TextField {...params} variant="standard" />}
    />
  )
}

export default DatePicker
