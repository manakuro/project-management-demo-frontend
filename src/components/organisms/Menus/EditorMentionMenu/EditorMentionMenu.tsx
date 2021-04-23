import React, { useCallback } from 'react'
import { ModalContent, Modal, ModalBody } from 'src/components/organisms'
import { useEditorMentionMenu } from './useEditorMentionMenu'
import { MentionItem } from './MentionItem'
import { useMenuStyle } from 'src/hooks'
import { MentionItemBase } from './MentionItem/MentionItemBase'

type Props = {}

export const EditorMentionMenu: React.VFC<Props> = () => {
  const { isOpen, x, y, onClose, mentions, setId } = useEditorMentionMenu()
  const menuStyles = useMenuStyle()

  const handleClick = useCallback(
    (val: string | number) => {
      setId(Number(val))
    },
    [setId],
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xs"
      autoFocus={false}
      trapFocus={false}
    >
      <ModalContent
        position="fixed"
        top={y + 24}
        left={x}
        mb={0}
        mt={0}
        maxW="450px"
      >
        <ModalBody w="full" px={0} {...menuStyles.list}>
          {mentions.length > 0 ? (
            mentions.map((m) => (
              <MentionItem
                onClick={handleClick}
                mention={m}
                key={`${m.type}_${m.id}`}
              />
            ))
          ) : (
            <MentionItemBase color="text.muted" pointerEvents="none">
              Mention a teammate or link to a task, project, or message.
            </MentionItemBase>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
