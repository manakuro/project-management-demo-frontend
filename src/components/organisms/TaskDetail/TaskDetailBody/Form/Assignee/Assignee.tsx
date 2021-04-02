import React, { useCallback, useState } from 'react'
import { Row, Label, Content } from '../Row'
import {
  Avatar,
  Button,
  ButtonProps,
  Icon,
  Text,
  Input,
  Box,
} from 'src/components/atoms'
import { useClickableHover } from 'src/hooks'
import { useHover } from 'src/hooks/useHover'

type Props = {}

const focusedStyle: ButtonProps = {
  bg: 'transparent',
  border: '1px',
  borderColor: 'gray.200',
  _hover: {
    bg: 'transparent',
  },
}

export const Assignee: React.FC<Props> = (props) => {
  const { clickableHoverLightStyle } = useClickableHover()
  const { ref, isHovering } = useHover()
  const [focused, setFocused] = useState(false)

  const handleClick = useCallback(() => {
    setFocused(true)
  }, [])

  return (
    <Row>
      <Label>Assignee</Label>
      <Content>
        <Button
          as={Box}
          variant="ghost"
          size="sm"
          ref={ref}
          border="1px"
          borderColor="transparent"
          onClick={handleClick}
          cursor="pointer"
          {...(focused ? focusedStyle : {})}
        >
          <Avatar
            name="Manato Kuroda"
            src="/images/cat_img.png"
            size="xs"
            cursor="pointer"
            bg="teal.200"
          />
          {focused ? (
            <Input
              autoFocus
              variant="unstyled"
              fontSize="sm"
              placeholder="mana"
              ml={2}
              w={60}
            />
          ) : (
            <>
              <Text ml={2} fontSize="sm">
                mana
              </Text>
              <Icon
                ml={2}
                mt="1px"
                icon="x"
                color="text.muted"
                size="sm"
                visibility={isHovering ? 'visible' : 'hidden'}
                {...clickableHoverLightStyle}
                onClick={(e) => {
                  e.stopPropagation()
                  console.log('click!')
                }}
              />
            </>
          )}
        </Button>
      </Content>
    </Row>
  )
}
