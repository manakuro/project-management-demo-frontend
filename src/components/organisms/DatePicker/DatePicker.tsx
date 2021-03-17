import React from 'react'
import { TextField } from '@material-ui/core'
import StaticDatePicker, {
  StaticDatePickerProps,
} from '@material-ui/lab/StaticDatePicker'

type Props = Omit<
  StaticDatePickerProps,
  'value' | 'onChange' | 'renderInput' | 'openTo'
>

const DatePicker: React.VFC<Props> = (props) => {
  const [value, setValue] = React.useState<Date | null>(new Date())

  return (
    <StaticDatePicker
      minDate={new Date()}
      maxDate={new Date('2022/3/12')}
      displayStaticWrapperAs="desktop"
      openTo="date"
      {...props}
      value={value}
      onChange={(newValue) => {
        setValue(newValue as Date)
      }}
      renderInput={(params) => <TextField {...params} variant="standard" />}
    />
  )
}

export default DatePicker
