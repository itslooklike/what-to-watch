import React from 'react'
import { Story, Meta } from '@storybook/react'

import { FilmDetails } from './FilmDetails'

import { mockFilm } from '~/store/FilmsStore/mocks'

export default {
  title: 'atoms/FilmDetails',
  component: FilmDetails,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof FilmDetails>> = (args) => (
  <FilmDetails {...args} />
)

export const Default = Template.bind({})
Default.args = {
  film: mockFilm,
}
