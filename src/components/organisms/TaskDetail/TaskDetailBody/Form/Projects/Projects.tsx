import React from 'react'
import { Row, Label, Content } from '../Row'
import { UnSelected } from './UnSelected'

type Props = {}

export const Projects: React.FC<Props> = (props) => {
  return (
    <Row>
      <Label>Projects</Label>
      <Content>
        <UnSelected />
      </Content>
    </Row>
  )
}
