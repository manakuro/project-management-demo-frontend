import React, { memo, useEffect, useRef } from 'react'
import { ConditionalRender, Flex, Stack } from 'src/components/atoms'
import 'prosemirror-view/style/prosemirror.css'
import { schema } from 'prosemirror-schema-basic'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'
import { history, redo, undo } from 'prosemirror-history'
import { useProseMirror, ProseMirror, Handle } from 'use-prosemirror'
import { EditorView } from 'prosemirror-view'
import { Bold, Italic, toggleBold, toggleItalic } from './ToolBar'

type Props = {}

const opts: Parameters<typeof useProseMirror>[0] = {
  schema,
  plugins: [
    history(),
    keymap({
      ...baseKeymap,
      'Mod-z': undo,
      'Mod-y': redo,
      'Mod-Shift-z': redo,
      'Mod-b': toggleBold,
      'Mod-i': toggleItalic,
    }),
  ],
}

export const Editor: React.FC<Props> = memo<Props>(() => {
  const [state, setState] = useProseMirror(opts)
  const viewRef = useRef<EditorView<any> & Handle>()

  useEffect(() => {
    setTimeout(() => {
      if (!viewRef.current?.view) return
      // Explicitly enable `focus ring` style
      // @see https://github.com/WICG/focus-visible#2-update-your-css
      viewRef.current.view.dom.classList.add('focus-visible')
    }, 300)
  }, [])

  return (
    <ConditionalRender client>
      <Flex
        border="1px"
        borderRadius="md"
        borderColor="transparent"
        _hover={{
          borderColor: 'gray.400',
        }}
        _focus={{
          borderColor: 'gray.400',
        }}
        p={2}
        flexDirection="column"
        flex={1}
      >
        <ProseMirror
          ref={viewRef as any}
          state={state}
          onChange={setState}
          style={{
            width: '100%',
          }}
        />
        <Stack flex={1} direction="row" spacing={1}>
          <Bold state={state} setState={setState} />
          <Italic state={state} setState={setState} />
        </Stack>
      </Flex>
    </ConditionalRender>
  )
})
