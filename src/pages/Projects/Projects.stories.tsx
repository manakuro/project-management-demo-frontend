import { ComponentStory, ComponentMeta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import React from 'react'
import { LayoutDefault } from 'src/components/organisms/Layout'
import { Container as Page } from './Container'

export default {
  title: 'Pages/Projects',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      asPath: '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/list',
      path: '/projects/[projectId]',
      query: {
        projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
        projects: ['list'],
      },
      pathname: '/projects/[projectId]/[[...projects]]',
    },
  },
  decorators: [
    (Story) => (
      <LayoutDefault>
        <Story />
      </LayoutDefault>
    ),
  ],
} as ComponentMeta<typeof Page>

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />

export const List = Template.bind({})

export const Board = Template.bind({})
Board.parameters = {
  nextRouter: {
    asPath: '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/board',
    path: '/projects/[projectId]/board',
    query: {
      projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
      projects: ['board'],
    },
  },
}
Board.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(await canvas.findByRole('tab', { name: 'Board' }))
}

export const Calendar = Template.bind({})
Calendar.parameters = {
  nextRouter: {
    asPath: '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/calendar',
    path: '/projects/[projectId]/calendar',
    query: {
      projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
      projects: ['calendar'],
    },
  },
}
Calendar.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(await canvas.findByRole('tab', { name: 'Calendar' }))
}

export const Files = Template.bind({})
Files.parameters = {
  nextRouter: {
    asPath: '/projects/0AG01GK0BWAWW1RDQ0KJJEKB6HC3G/files',
    path: '/projects/[projectId]/files',
    query: {
      projectId: '0AG01GK0BWAWW1RDQ0KJJEKB6HC3G',
      projects: ['files'],
    },
  },
}
Files.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(await canvas.findByRole('tab', { name: 'Files' }))
}
