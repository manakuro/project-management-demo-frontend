import React, { memo } from 'react'
import { EditorContent, EditorContainer } from './Editors'
import { schema, plugins } from 'src/shared/prosemirror/config'
import { Container } from './Container'
import { ToolBar } from './ToolBar'

type Props = {
  onChange: (val: string) => void
  value: string
}

export const Editor: React.FC<Props> = memo<Props>((props) => {
  return (
    <Container>
      {({ focused }) => (
        <>
          <EditorContainer
            schema={schema}
            plugins={plugins}
            value={props.value}
            onChange={props.onChange}
            debounce={500}
          >
            <EditorContent />
            <ToolBar show={focused} />
          </EditorContainer>
        </>
      )}
    </Container>
  )
})
