import React, { memo } from 'react'
import { Row, Label, Content } from '../Row'
import 'prosemirror-view/style/prosemirror.css'
import { Editor } from 'src/components/organisms'

type Props = {}

export const Description: React.FC<Props> = memo<Props>(() => {
  return (
    <Row>
      <Label>Description</Label>
      <Content>
        <Editor />
      </Content>
    </Row>
  )
})
