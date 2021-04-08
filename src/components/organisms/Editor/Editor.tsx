import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { ConditionalRender, Flex, Stack } from 'src/components/atoms'
import 'prosemirror-view/style/prosemirror.css'
import { schema } from 'src/components/organisms/Editor/schema'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'
import { history, redo, undo } from 'prosemirror-history'
import { useProseMirror, ProseMirror, Handle } from 'use-prosemirror'
import { EditorView } from 'prosemirror-view'
import {
  Bold,
  Italic,
  toggleBold,
  toggleItalic,
  toggleUnderline,
  Underline,
} from './ToolBar'
import { useClickOutside } from 'src/hooks'

type Props = {}

const options: Parameters<typeof useProseMirror>[0] = {
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
      'Mod-u': toggleUnderline,
    }),
  ],
}

export const Editor: React.FC<Props> = memo<Props>(() => {
  const [state, setState] = useProseMirror(options)
  const viewRef = useRef<EditorView<any> & Handle>()
  const [focused, setFocused] = useState(false)
  const { ref, hasClickedOutside } = useClickOutside()

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (!viewRef.current?.view) return
      // Explicitly enable `focus ring` style
      // @see https://github.com/WICG/focus-visible#2-update-your-css
      viewRef.current.view.dom.classList.add('focus-visible')
    }, 300)
  }, [])

  useEffect(() => {
    if (hasClickedOutside) {
      setFocused(false)
    }
  }, [hasClickedOutside])

  return (
    <ConditionalRender client>
      <Flex
        ref={ref}
        border="1px"
        borderRadius="md"
        borderColor={focused ? 'gray.400' : 'transparent'}
        _hover={{
          borderColor: 'gray.400',
        }}
        p={3}
        flexDirection="column"
        flex={1}
        onFocus={handleFocus}
      >
        <ProseMirror
          ref={viewRef as any}
          state={state}
          onChange={setState}
          style={{
            width: '100%',
          }}
        />
        <Stack flex={1} direction="row" spacing={1} minH={8}>
          {focused && (
            <>
              <Bold state={state} setState={setState} />
              <Italic state={state} setState={setState} />
              <Underline state={state} setState={setState} />
            </>
          )}
        </Stack>
      </Flex>
    </ConditionalRender>
  )
})
