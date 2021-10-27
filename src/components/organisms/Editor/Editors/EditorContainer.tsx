import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import { EditorProps } from 'prosemirror-view'
import React, { PropsWithChildren, useMemo } from 'react'
import { ConditionalRender } from 'src/components/atoms'
import { useDebounce, usePrevious } from 'src/hooks'
import {
  createJSONTransformer,
  ProsemirrorTransformer,
} from 'src/shared/prosemirror/transformers'
import { EditorProvider, useEditorStateContext } from './EdiorProvider'
import { Portals } from './Portals'

type Props = {
  schema: Schema
  plugins: Plugin[]
  initialValue: string
  onChange?: (value: string) => void
  debounce: number
  forceUpdate?: () => string
} & EditorProps

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
export const Container = <P extends unknown>(
  props: PropsWithChildren<ContainerProps<P>>,
) => {
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
