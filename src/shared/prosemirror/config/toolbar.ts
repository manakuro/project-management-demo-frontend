import { isBlockActive, isMarkActive, isWrapped } from '../commands'
import { Schema } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import {
  liftListItemCommand,
  setBlockTypeCodeBlock,
  setBlockTypeHeading,
  setBlockTypeParagraph,
  setListTypeBullet,
  setListTypeOrdered,
  sinkListItemCommand,
  toggleLink,
  toggleMarkBold,
  toggleMarkCode,
  toggleMarkItalic,
  toggleMarkStrikethrough,
  toggleMarkSubscript,
  toggleMarkSuperscript,
  toggleMarkUnderline,
  toggleWrapBlockquote,
} from './commands'
import { schema } from './schema'

type ToolbarItem<S extends Schema = any> = {
  id: string
  action: (
    state: EditorState<S>,
    dispatch: (tr: Transaction<S>) => void,
    view: EditorView,
  ) => boolean
  content: any
  title?: string
  active?: (state: EditorState<S>) => boolean
  enable?: (state: EditorState<S>) => boolean
}

type ToolbarGroup<S extends Schema = any> = {
  id: string
  items: ToolbarItem<S>[]
}

export const toolbar: ToolbarGroup[] = [
  {
    id: 'marks',
    items: [
      {
        id: 'toggle-bold',
        content: '' as any,
        action: toggleMarkBold,
        enable: toggleMarkBold,
        active: isMarkActive(schema.marks.bold),
      },
      {
        id: 'toggle-italic',
        title: 'Toggle italic',
        content: '' as any,
        action: toggleMarkItalic,
        enable: toggleMarkItalic,
        active: isMarkActive(schema.marks.italic),
      },
      {
        id: 'toggle-code',
        title: 'Toggle code',
        content: '' as any,
        action: toggleMarkCode,
        enable: toggleMarkCode,
        active: isMarkActive(schema.marks.code),
      },
      {
        id: 'toggle-subscript',
        content: '' as any,
        action: toggleMarkSubscript,
        enable: toggleMarkSubscript,
        active: isMarkActive(schema.marks.subscript),
      },
      {
        id: 'toggle-superscript',
        content: '' as any,
        action: toggleMarkSuperscript,
        enable: toggleMarkSuperscript,
        active: isMarkActive(schema.marks.superscript),
      },
      {
        id: 'toggle-underline',
        content: '' as any,
        action: toggleMarkUnderline,
        enable: toggleMarkUnderline,
        active: isMarkActive(schema.marks.underline),
      },
      {
        id: 'toggle-strikethrough',
        content: '' as any,
        action: toggleMarkStrikethrough,
        enable: toggleMarkStrikethrough,
        active: isMarkActive(schema.marks.strikethrough),
      },
    ],
  },
  {
    id: 'link',
    items: [
      {
        id: 'toggle-link',
        title: 'Add or remove link',
        content: '' as any,
        action: toggleLink,
        enable: (state) => !state.selection.empty,
        active: isMarkActive(schema.marks.link),
      },
    ],
  },
  {
    id: 'switch-blocks',
    items: [
      {
        id: 'block-paragraph',
        title: 'Change to paragraph',
        content: '' as any,
        action: setBlockTypeParagraph,
        enable: setBlockTypeParagraph,
        active: isBlockActive(schema.nodes.paragraph),
      },
      {
        id: 'block-heading-1',
        title: 'Change to heading level 1',
        content: '' as any,
        action: setBlockTypeHeading(1),
        enable: setBlockTypeHeading(1),
        active: isBlockActive(schema.nodes.heading, { level: 1 }),
      },
      {
        id: 'block-code-block',
        title: 'Change to code block',
        content: '' as any,
        action: setBlockTypeCodeBlock,
        enable: setBlockTypeCodeBlock,
        active: isBlockActive(schema.nodes.codeBlock),
      },
    ],
  },
  {
    id: 'toggle-blocks',
    items: [
      {
        id: 'block-blockquote',
        title: 'Toggle blockquote wrapper',
        content: '' as any,
        action: toggleWrapBlockquote,
        enable: toggleWrapBlockquote,
        active: isWrapped(schema.nodes.blockquote),
      },
    ],
  },
  {
    id: 'lists',
    items: [
      {
        id: 'block-bullet-list',
        title: 'Wrap in bullet list',
        content: '' as any,
        action: setListTypeBullet,
        enable: setListTypeBullet,
        active: isBlockActive(schema.nodes.list, { type: 'bullet' }),
      },
      {
        id: 'block-ordered-list',
        title: 'Wrap in ordered list',
        content: '' as any,
        action: setListTypeOrdered,
        enable: setListTypeOrdered,
        active: isBlockActive(schema.nodes.list, { type: 'ordered' }),
      },
    ],
  },
  {
    id: 'indentation',
    items: [
      {
        id: 'outdent',
        title: 'Outdent',
        action: liftListItemCommand,
        enable: liftListItemCommand,
        content: '' as any,
      },
      {
        id: 'indent',
        title: 'Indent',
        action: sinkListItemCommand,
        enable: sinkListItemCommand,
        content: '' as any,
      },
    ],
  },
]
