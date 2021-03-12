import React, { memo, useCallback, useState } from 'react'
import { Layout, MainHeader } from 'src/components/organisms'
import { Head } from 'src/components/atoms/Head'
import { Heading, Box, Stack } from 'src/components/atoms'
import { TasksDueSoon } from './TasksDueSoon'
import DateFnsUtils from '@date-io/date-fns'
import { Calendar, DatePicker } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

type Props = {}

const dateFns = new DateFnsUtils()
export const Component: React.VFC<Props> = memo<Props>((props) => {
  const [
    selectedDate,
    setSelectedDate,
  ] = useState<MaterialUiPickersDate | null>(dateFns.date())
  const handleDateChange = useCallback((date: MaterialUiPickersDate) => {
    setSelectedDate(date)
  }, [])

  return (
    <Layout>
      <Head title="Home" />
      <MainHeader>
        <Heading as="h2" size="md">
          Home
        </Heading>
      </MainHeader>
      <Box w="840px" mx="auto" py={10}>
        <Stack spacing={10}>
          <TasksDueSoon />
          <Calendar
            date={selectedDate}
            onChange={handleDateChange}
            disablePast
          />
        </Stack>
      </Box>
    </Layout>
  )
})
