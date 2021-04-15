import React, { PropsWithChildren, useEffect, useMemo } from 'react'
import {
  createJSONTransformer,
  ProsemirrorTransformer,
} from 'src/shared/prosemirror/transformers'
import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import { EditorProvider, useEditorState } from './EdiorProvider'
import { Portals } from './Portals'
import { useDebounce } from 'src/hooks'

type Props = {
  schema: Schema
  plugins: Plugin[]
  value: string
  onChange: (value: string) => void
  debounce?: number
}
export const EditorContainer: React.FC<Props> = (props) => {
  const transformer = useMemo<ProsemirrorTransformer>(
    () => createJSONTransformer(props.schema),
    [props.schema],
  )
  const initialDoc = useMemo<ProsemirrorNode>(
    () => transformer.parse(props.value),
    [props.value, transformer],
  )

  return (
    <EditorProvider plugins={props.plugins} doc={initialDoc}>
      <Container transformer={transformer} {...props} />
      <Portals />
    </EditorProvider>
  )
}

type ContainerProps<P> = {
  onChange: (value: P) => void
  transformer: ProsemirrorTransformer<P>
  debounce?: number
}
export const Container = <P extends unknown>(
  props: PropsWithChildren<ContainerProps<P>>,
) => {
  const state = useEditorState()
  const debouncedDoc = useDebounce(state.doc, props.debounce)

  useEffect(() => {
    props.onChange(props.transformer.serialize(debouncedDoc))
  }, [props, debouncedDoc])

  return <>{props.children}</>
}
