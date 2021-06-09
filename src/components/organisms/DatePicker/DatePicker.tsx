import { TextField } from '@material-ui/core'
import StaticDatePicker, {
  StaticDatePickerProps,
} from '@material-ui/lab/StaticDatePicker'
import React from 'react'
import { ConditionalRender } from 'src/components/atoms'

type Props = Omit<StaticDatePickerProps, 'renderInput' | 'openTo'>

export const DatePicker: React.VFC<Props> = (props) => {
  return (
    <ConditionalRender client>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="date"
        {...props}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </ConditionalRender>
  )
}
