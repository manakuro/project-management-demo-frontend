import React, { memo } from 'react'
import { Row, Label, Content } from '../Row'
import { InputText } from 'src/components/atoms'

type Props = {}

export const Description: React.FC<Props> = memo<Props>(() => {
  return (
    <Row>
      <Label>Description</Label>
      <Content>
        <InputText
          fontSize="sm"
          value="Organize components folder"
          onChange={() => {}}
        />
      </Content>
    </Row>
  )
})
