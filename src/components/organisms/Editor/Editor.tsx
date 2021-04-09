import React, { memo, useState } from 'react'
import { ConditionalRender } from 'src/components/atoms'
import 'prosemirror-view/style/prosemirror.css'
import { Editor as ReactProseMirrorEditor, HtmlEditor } from './Components'
import { schema, plugins } from 'src/shared/prosemirror/config'
import { Container } from './Container'

type Props = {}

const initialValue = '<p></p>'
export const Editor: React.FC<Props> = memo<Props>(() => {
  const [value, setValue] = useState(initialValue)

  console.log('value: ', value)

  return (
    <ConditionalRender client>
      <Container>
        <HtmlEditor
          schema={schema}
          plugins={plugins}
          value={initialValue}
          onChange={setValue}
          debounce={250}
        >
          <ReactProseMirrorEditor />
        </HtmlEditor>
      </Container>
    </ConditionalRender>
  )
})
