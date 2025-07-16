import styled from '@emotion/styled'
import type React from 'react'
import { type ChakraProps, chakra } from 'src/shared/chakra'

type Props = {
  seconds: number
} & ChakraProps
export const Duration: React.FC<Props> = (props) => {
  return (
    <Time {...props} dateTime={`P${Math.round(props.seconds)}S`}>
      {format(props.seconds)}
    </Time>
  )
}

const format = (seconds: number) => {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}

const pad = (str: number) => `0${str}`.slice(-2)

const Time = chakra(
  styled.time`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  {
    baseStyle: {
      fontSize: 'xs',
    },
  },
)
