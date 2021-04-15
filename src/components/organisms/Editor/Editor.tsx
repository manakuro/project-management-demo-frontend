import React, { memo } from 'react'
import { ConditionalRender } from 'src/components/atoms'
import { Editor as ReactProseMirrorEditor, HtmlEditor } from './Components'
import { schema, plugins } from 'src/shared/prosemirror/config'
import { Container } from './Container'
import { ToolBar } from './ToolBar'

type Props = {
  onChange: (val: string) => void
  value: string
}

export const Editor: React.FC<Props> = memo<Props>((props) => {
  return (
    <ConditionalRender client>
      <Container>
        {({ focused }) => (
          <>
            <HtmlEditor
              schema={schema}
              plugins={plugins}
              value={props.value}
              onChange={props.onChange}
              debounce={250}
            >
              <ReactProseMirrorEditor />
              <ToolBar show={focused} />
            </HtmlEditor>
          </>
        )}
      </Container>
    </ConditionalRender>
  )
})
