import React, { useCallback } from 'react'
import { ModalBody, ModalContent } from 'src/components/organisms'
import { useEditorEmojiMenu } from './useEditorEmojiMenu'
import { EmojiItem } from './EmojiItem'
import { useMenuStyle } from 'src/hooks'

type Props = {}

export const MenuList: React.VFC<Props> = () => {
  const { emojis, x, y, setValue, containerRef } = useEditorEmojiMenu()
  const menuStyles = useMenuStyle()

  const handleClick = useCallback(
    (val: any) => {
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
        {emojis.map((e, i) => (
          <EmojiItem onClick={handleClick} emoji={e} key={e.id} index={i} />
        ))}
      </ModalBody>
    </ModalContent>
  )
}
