import React, { useCallback, useState } from 'react'
import { Row, Label, Content } from '../Row'
import {
  Avatar,
  Button,
  ButtonProps,
  Icon,
  Text,
  Box,
} from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useHover } from 'src/hooks/useHover'
import { Input } from './Input'

type Props = {}

const focusedStyle: ButtonProps = {
  bg: 'transparent',
  border: '1px',
  borderColor: 'gray.200',
  _hover: {
    bg: 'transparent',
  },
}

export const Assignee: React.FC<Props> = () => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { ref, isHovering } = useHover()
  const [focused, setFocused] = useState(false)

  const handleClick = useCallback(() => {
    setFocused(true)
  }, [])

  const handleClickInputOutside = useCallback(() => {
    setFocused(false)
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
            <Input onClickOutside={handleClickInputOutside} />
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
