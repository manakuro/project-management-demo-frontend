import { useDisclosure } from 'src/shared/chakra'
import React, { useCallback, useState } from 'react'

type Props<ListStatus> = {
  status: ListStatus
  onOpened?: () => void
  onClosed?: () => void
}

export const useMenuOption = <ListStatus,>(props: Props<ListStatus>) => {
  const disclosure = useDisclosure()
  const [listState, setListState] = useState<ListStatus | undefined>(
    props.status,
  )

  const onOpen = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      disclosure.onOpen()
      props.onOpened?.()
    },
    [disclosure, props],
  )

  const onClose = useCallback(() => {
    disclosure.onClose()
    props.onClosed?.()
  }, [disclosure, props])

  const onChange = useCallback(
    (status: ListStatus) => {
      setListState(status)
      onClose()
    },
    [onClose],
  )

  return {
    isOpen: disclosure.isOpen,
    onOpen,
    onClose,
    onChange,
    listState,
  }
}
