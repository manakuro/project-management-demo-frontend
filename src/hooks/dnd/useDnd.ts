import { useCallback, useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'

type ListType<T> = Readonly<T>

const sort = <T>(
  list: ListType<T[]>,
  startIndex: number,
  endIndex: number,
): T[] => {
  const arr = Array.from(list)
  const [deleted] = arr.splice(startIndex, 1)
  arr.splice(endIndex, 0, deleted)

  return arr
}

export const useDnd = <T>(defaultList: ListType<T[]>) => {
  const [list, setList] = useState<ListType<T[]>>(defaultList)

  const handleDnd = useCallback(
    (result: DropResult) => {
      if (
        !result.destination ||
        result.destination.index === result.source.index
      ) {
        return
      }

      const sorted = sort(list, result.source.index, result.destination.index)
      setList(sorted)
    },
    [list],
  )

  return {
    handleDnd,
    list,
  }
}
