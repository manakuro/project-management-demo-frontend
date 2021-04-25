import React, { useCallback } from 'react'
import { ModalBody, ModalContent } from 'src/components/organisms'
import { useEditorMentionMenu, SetValueParam } from './useEditorMentionMenu'
import { MentionItem } from './MentionItem'
import { useMenuStyle } from 'src/hooks'
import { Empty } from './MentionItem/Empty'

type Props = {}

export const MenuList: React.VFC<Props> = () => {
  const { mentions, x, y, setValue, containerRef } = useEditorMentionMenu()
  const menuStyles = useMenuStyle()

  const handleClick = useCallback(
    (val: SetValueParam) => {
      setValue(val)
    },
    [setValue],
  )

  return (
    <ModalContent
      position="fixed"
      top={y + 24}
      left={x}
      mb={0}
      mt={0}
      maxW="450px"
      maxH={56}
      overflowY="scroll"
      ref={containerRef}
    >
      <ModalBody w="full" px={0} {...menuStyles.list}>
        {mentions.length > 0 ? (
          mentions.map((m, i) => (
            <MentionItem
              onClick={handleClick}
              mention={m}
              key={`${m.type}_${m.id}`}
              index={i}
            />
          ))
        ) : (
          <Empty>
            Mention a teammate or link to a task, project, or message.
          </Empty>
        )}
      </ModalBody>
    </ModalContent>
  )
}
