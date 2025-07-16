import { useCallback } from 'react'
import { ModalBody, ModalContent } from 'src/components/ui/organisms/Modal'
import { useMenuStyle } from 'src/hooks'
import type { BaseEmoji } from 'src/shared/emoji'
import { EmojiItem } from './EmojiItem'
import { useEditorEmojiMenu } from './useEditorEmojiMenu'

export function MenuList() {
  const { emojis, x, y, setValue, containerRef } = useEditorEmojiMenu()
  const menuStyles = useMenuStyle()

  const handleClick = useCallback(
    (val: BaseEmoji) => {
      setValue(val)
    },
    [setValue],
  )

  return (
    <ModalContent
      position="fixed"
      top={y}
      left={x}
      mb={0}
      mt={0}
      maxW="450px"
      maxH={56}
      overflowY="scroll"
      ref={containerRef}
    >
      <ModalBody w="full" px={0} {...menuStyles.list}>
        {emojis.map((e, i) => (
          <EmojiItem onClick={handleClick} emoji={e} key={e.id} index={i} />
        ))}
      </ModalBody>
    </ModalContent>
  )
}
