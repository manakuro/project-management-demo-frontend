import type { Node as ProsemirrorNode, Schema } from 'prosemirror-model'
import type { Plugin } from 'prosemirror-state'
import type { EditorProps } from 'prosemirror-view'
import type React from 'react'
import { type PropsWithChildren, useMemo } from 'react'
import { ConditionalRender } from 'src/components/ui/atoms'
import { useDebounce, usePrevious } from 'src/hooks'
import {
  type ProsemirrorTransformer,
  createJSONTransformer,
} from 'src/shared/prosemirror/transformers'
import { EditorProvider, useEditorStateContext } from './EdiorProvider'
import { Portals } from './Portals'

type Props = PropsWithChildren<{
  schema: Schema
  plugins: Plugin[]
  initialValue: string
  onChange?: (value: string) => void
  debounce: number
  forceUpdate?: number
  resetView?: number
}> &
  EditorProps

export const EditorContainer: React.FC<Props> = (props) => {
  const transformer = useMemo<ProsemirrorTransformer>(
    () => createJSONTransformer(props.schema),
    [props.schema],
  )
  const initialDoc = useMemo<ProsemirrorNode>(
    () => transformer.parse(props.initialValue),
    [props.initialValue, transformer],
  )

  return (
    <ConditionalRender client>
      <EditorProvider
        plugins={props.plugins}
        doc={initialDoc}
        editable={props.editable}
        forceUpdate={props.forceUpdate}
        resetView={props.resetView}
      >
        <Container
          transformer={transformer}
          debounce={props.debounce}
          onChange={props.onChange}
          initialValue={props.initialValue}
        >
          {props.children}
        </Container>
        <Portals />
      </EditorProvider>
    </ConditionalRender>
  )
}

type ContainerProps<P> = {
  onChange?: (value: P) => void
  transformer: ProsemirrorTransformer<P>
  debounce: number
  initialValue: string
}
export const Container = <P,>(props: PropsWithChildren<ContainerProps<P>>) => {
  const state = useEditorStateContext()
  const prevStateDoc = usePrevious<ProsemirrorNode<any>>(state.doc)

  useDebounce(
    state.doc,
    (val) => {
      const serializedValue = props.transformer.serialize(val)
      if (
        prevStateDoc &&
        serializedValue === props.transformer.serialize(prevStateDoc)
      )
        return
      props.onChange?.(serializedValue)
    },
    props.debounce,
  )

  return <>{props.children}</>
}
