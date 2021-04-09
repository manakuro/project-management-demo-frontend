import React, { memo, useState } from 'react'
import { ConditionalRender, Stack } from 'src/components/atoms'
import 'prosemirror-view/style/prosemirror.css'
import { Editor as ReactProseMirrorEditor, HtmlEditor } from './Components'
import { schema, plugins } from 'src/shared/prosemirror/config'
import { Container } from './Container'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  BulletList,
  OrderedList,
} from './ToolBar'

type Props = {}

const initialValue = '<p></p>'
export const Editor: React.FC<Props> = memo<Props>(() => {
  const [value, setValue] = useState(initialValue)

  console.log('value: ', value)

  return (
    <ConditionalRender client>
      <Container>
        {({ focused }) => (
          <>
            <HtmlEditor
              schema={schema}
              plugins={plugins}
              value={initialValue}
              onChange={setValue}
              debounce={250}
            >
              <ReactProseMirrorEditor />
              <Stack flex={1} direction="row" spacing={1} minH={8}>
                {focused && (
                  <>
                    <Bold />
                    <Italic />
                    <Underline />
                    <Strikethrough />
                    <BulletList />
                    <OrderedList />
                  </>
                )}
              </Stack>
            </HtmlEditor>
          </>
        )}
      </Container>
    </ConditionalRender>
  )
})
