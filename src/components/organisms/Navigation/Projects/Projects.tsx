import React from 'react'
import { Flex } from 'src/components/atoms'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { Workspace } from './Workspace'
import { Teammates } from './Teammates'
import { ProjectList } from './ProjectList'
import { useNavigation } from 'src/components/organisms/Navigation'

type Props = {}

export const Projects: React.VFC<Props> = () => {
  const { isExpanded } = useNavigation()

  return (
    <>
      <Divider />
      <Flex flexDirection="column" flex={1}>
        <Workspace />
        {isExpanded && (
          <Teammates
            teammates={[
              {
                name: 'Manato Kuroda',
                image: '/images/cat_img.png',
                email: 'manato.kuroda@gmail.com',
              },
              {
                name: 'Dan Abrahmov',
                image: 'https://bit.ly/dan-abramov',
                email: 'dan.abrahmov@gmail.com',
              },
              {
                name: 'Kent Dodds',
                image: 'https://bit.ly/kent-c-dodds',
                email: 'kent.dodds@gmail.com',
              },
            ]}
          />
        )}
        <ProjectList />
      </Flex>
    </>
  )
}
