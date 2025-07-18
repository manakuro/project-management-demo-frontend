import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { LayoutDefault } from 'src/components/ui/organisms/Layout';
import { Container as Page } from './Container';

export default {
  title: 'Pages/Workspaces',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      asPath: '/workspaces/0AD01GK0BWAQZYWRN2T89M5K2620Z/overview',
      path: '/workspaces/[workspaceId]/[[...workspaces]]',
      query: {
        workspaceId: '0AD01GK0BWAQZYWRN2T89M5K2620Z',
        workspaces: ['overview'],
      },
      pathname: '/workspaces/[workspaceId]/[[...workspaces]]',
    },
  },
  decorators: [
    (Story) => (
      <LayoutDefault>
        <Story />
      </LayoutDefault>
    ),
  ],
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;
export const Overview = Template.bind({});
