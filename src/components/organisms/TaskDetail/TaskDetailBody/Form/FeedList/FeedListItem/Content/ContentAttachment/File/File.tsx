import React from 'react'
import { FlexProps } from 'src/components/atoms'
import { AttachmentBox } from 'src/components/molecules'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'
import { useAttachment } from 'src/store/attachments'

type Props = FlexProps

export const File: React.VFC<Props> = (props) => {
  const { feed } = useFeedListItem()
  const { attachment } = useAttachment(feed.attachmentId)

  return (
    <AttachmentBox
      size="lg"
      bg="white"
      cursor="pointer"
      attachmentId={attachment.id}
      _hover={{
        borderColor: 'gray.400',
      }}
      {...props}
    />
  )
}
