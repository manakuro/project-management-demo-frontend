import React, { useCallback } from 'react'
import { ModalContent, Modal, ModalBody } from 'src/components/organisms'
import { useEditorMentionMenu } from './useEditorMentionMenu'
import { MentionItem } from './MentionItem'
import { useMenuStyle } from 'src/hooks'

type Props = {}

export const EditorMentionMenu: React.VFC<Props> = () => {
  const { isOpen, x, y, onClose, teammates, setId } = useEditorMentionMenu()
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
          {teammates.length > 0 ? (
            teammates.map((t) => (
              <MentionItem onClick={handleClick} value={t.id} key={t.id}>
                {t.email}
              </MentionItem>
            ))
          ) : (
            <MentionItem color="text.muted" value="" pointerEvents="none">
              Mention a teammate or link to a task, project, or message.
            </MentionItem>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
