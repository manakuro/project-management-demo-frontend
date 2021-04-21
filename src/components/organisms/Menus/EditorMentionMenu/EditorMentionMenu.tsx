import React from 'react'
import { Menu, MenuButton, MenuList } from 'src/components/organisms'
import { Portal } from 'src/components/atoms'
import { useEditorMentionMenu } from './useEditorMentionMenu'
import { MentionItem } from './MentionItem'

type Props = {}

export const EditorMentionMenu: React.VFC<Props> = () => {
  const { isOpen, x, y, onClose, teammates } = useEditorMentionMenu()

  return (
    <Menu
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom-start"
      isLazy
      offset={[0, 0]}
      autoSelect={false}
    >
      <MenuButton />
      <Portal>
        <MenuList
          zIndex="popover"
          overflowY="scroll"
          position="fixed"
          top={y + 24}
          left={x}
          w="450px"
        >
          {teammates.length > 0 ? (
            teammates.map((t) => (
              <MentionItem
                onClick={(val) => console.log(val)}
                value={t.email}
                key={t.id}
              >
                {t.email}
              </MentionItem>
            ))
          ) : (
            <MentionItem color="text.muted" value="" pointerEvents="none">
              Mention a teammate or link to a task, project, or message.
            </MentionItem>
          )}
        </MenuList>
      </Portal>
    </Menu>
  )
}
