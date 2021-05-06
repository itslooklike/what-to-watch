import React from 'react'
import { Story, Meta } from '@storybook/react'

import { FilmOverview } from './FilmOverview'

import { mockFilm } from '~/store/FilmsStore/mocks'

export default {
  title: 'atoms/FilmOverview',
  component: FilmOverview,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof FilmOverview>> = (args) => (
  <FilmOverview {...args} />
)

export const Default = Template.bind({})
Default.args = {
  film: mockFilm,
}
