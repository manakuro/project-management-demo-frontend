import React from 'react'
import { Row, Label, Content } from './Row'

type Props = {}

export const Assignee: React.FC<Props> = (props) => {
  return (
    <Row>
      <Label>Assignee</Label>
      <Content>hey</Content>
    </Row>
  )
}
