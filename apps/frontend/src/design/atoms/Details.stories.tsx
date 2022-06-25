import React from 'react'
import { Story, Meta } from '@storybook/react'

import { mockFilm } from '~/store/FilmsStore/mocks'
import { Details } from './Details'


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
