import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Details } from './Details'

import { mockFilm } from '~/store/FilmsStore/mocks'

export default {
  title: 'atoms/Details',
  component: Details,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof Details>> = (args) => <Details {...args} />

export const Default = Template.bind({})
Default.args = {
  film: mockFilm,
}
