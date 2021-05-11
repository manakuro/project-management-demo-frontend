import React from 'react'
import { FlexProps } from 'src/components/atoms'
import { Menu } from './Menu'
import { ListItem } from './ListItem'
import { MenuButton } from './MenuButton'
import { Provider } from './Provider'
import { Tooltip } from './Tooltip'
import { Container } from './Container'

type Props = FlexProps & {
  attachmentId: string
}

export const ThumbnailAttachment: React.VFC<Props> = (props) => {
  const { attachmentId, ...rest } = props

  return (
    <Provider>
      <Tooltip attachmentId={attachmentId}>
        <Container {...rest}>
          <ListItem attachmentId={attachmentId} />
          <Menu attachmentId={attachmentId}>
            <MenuButton light />
          </Menu>
        </Container>
      </Tooltip>
    </Provider>
  )
}
