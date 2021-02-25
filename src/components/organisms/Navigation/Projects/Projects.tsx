import React from 'react'
import { Flex } from 'src/components/atoms'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { Workspace } from './Workspace'
import { Teammates } from './Teammates'
import { ProjectList } from './ProjectList'

type Props = {}

export const Projects: React.VFC<Props> = () => {
  return (
    <>
      <Divider />
      <Flex flexDirection="column" flex={1}>
        <Workspace />
        <Teammates
          teammates={[
            { name: 'Manato Kuroda', image: '/images/cat_img.png' },
            { name: 'Dan Abrahmov', image: 'https://bit.ly/dan-abramov' },
            { name: 'Kent Dodds', image: 'https://bit.ly/kent-c-dodds' },
          ]}
        />
        <ProjectList />
      </Flex>
    </>
  )
}
