import React, { memo } from 'react'
import { SHARE_INDEX, MEMBERS_INDEX } from '../types'
import { useShareProjectModal } from '../useShareProjectModal'
import { Members } from './Members'
import { Share } from './Share'

type Props = {}

export const Footer: React.FC<Props> = memo<Props>(() => {
  const { tabIndex } = useShareProjectModal()

  switch (tabIndex) {
    case SHARE_INDEX: {
      return <Share />
    }
    case MEMBERS_INDEX: {
      return <Members />
    }
  }
})
Footer.displayName = 'Footer'
