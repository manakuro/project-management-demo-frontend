import React, { memo, useState } from 'react'
import { Row, Label, Content } from '../Row'
import 'prosemirror-view/style/prosemirror.css'
import { Editor } from 'src/components/organisms'

type Props = {}

const initialValue = '<p>Hi, there</p>'
export const Description: React.FC<Props> = memo<Props>(() => {
  const [value, setValue] = useState(initialValue)

  console.log('value: ', value)

  return (
    <Row>
      <Label>Description</Label>
      <Content>
        <Editor onChange={setValue} value={initialValue} />
      </Content>
    </Row>
  )
})
