import React, { memo, useCallback, useMemo } from 'react'
import { Icon, IconButton, Link, PortalManager } from 'src/components/atoms'
import { Popover, PopoverTrigger } from 'src/components/organisms'
import { useEditorStateContext } from 'src/components/organisms/Editor/Editors'
import { useDisclosure } from 'src/shared/chakra'
import {
  useBold,
  useBulletList,
  useItalic,
  useOrderedList,
  useStrikethrough,
  useUnderline,
} from 'src/shared/prosemirror/hooks'
import { Content } from './Content'
type Props = {}

export const Format: React.FC<Props> = memo<Props>(() => {
  const state = useEditorStateContext()
  const popoverDisclosure = useDisclosure()
  const useBoldResult = useBold()
  const useItalicResult = useItalic()
  const useUnderlineResult = useUnderline()
  const useStrikethroughResult = useStrikethrough()
  const useBulletListResult = useBulletList()
  const useOrderedListResult = useOrderedList()

  const isActive = useMemo(() => {
    return (
      useBoldResult.isActive?.(state) ||
      useItalicResult.isActive?.(state) ||
      useUnderlineResult.isActive?.(state) ||
      useStrikethroughResult.isActive?.(state) ||
      useBulletListResult.isActive?.(state) ||
      useOrderedListResult.isActive?.(state)
    )
  }, [
    state,
    useBoldResult,
    useBulletListResult,
    useItalicResult,
    useOrderedListResult,
    useStrikethroughResult,
    useUnderlineResult,
  ])

  const handleClose = useCallback(() => {
    popoverDisclosure.onClose()
  }, [popoverDisclosure])

  return (
    <PortalManager zIndex={1500}>
      <Popover
        isOpen={popoverDisclosure.isOpen}
        placement="top"
        isLazy
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Link onClick={popoverDisclosure.onOpen}>
            <IconButton
              aria-label="format"
              icon={<Icon icon="textFormat" color="text.muted" />}
              variant="ghost"
              size="sm"
              colorScheme="teal"
              isActive={isActive}
            />
          </Link>
        </PopoverTrigger>
        {popoverDisclosure.isOpen && <Content onClose={handleClose} />}
      </Popover>
    </PortalManager>
  )
})
