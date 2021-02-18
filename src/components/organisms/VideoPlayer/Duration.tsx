import React from 'react'
import styled from '@emotion/styled'

type Props = {
  seconds: number
}
export const Duration: React.VFC<Props> = (props) => {
  return (
    <Time dateTime={`P${Math.round(props.seconds)}S`}>
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

const pad = (str: number) => ('0' + str).slice(-2)

const Time = styled.time`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin-right: 1rem;
`
