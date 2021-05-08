import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Overview } from './Overview'

import { mockFilm } from '~/store/FilmsStore/mocks'

export default {
  title: 'atoms/Overview',
  component: Overview,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof Overview>> = (args) => <Overview {...args} />

export const Default = Template.bind({})
Default.args = {
  film: mockFilm,
}
