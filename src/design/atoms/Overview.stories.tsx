import React from 'react'
import { Story, Meta } from '@storybook/react'

import { mockFilm } from '~/store/FilmsStore/mocks'
import { Overview } from './Overview'


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
