import React, { memo } from 'react'
import { Row, Label, Content } from '../Row'
import { Selected } from './Selected'
import { UnSelected } from './UnSelected'

type Props = {}

export const Projects: React.FC<Props> = memo<Props>(() => {
  return (
    <Row>
      <Label>Projects</Label>
      <Content>
        {false && <UnSelected />}
        <Selected />
      </Content>
    </Row>
  )
})
