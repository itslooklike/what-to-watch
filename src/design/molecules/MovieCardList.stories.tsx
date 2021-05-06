import React from 'react'
import { Story, Meta } from '@storybook/react'

import { MovieCardList } from './MovieCardList'

import { mockFilms } from '~/store/FilmsStore/mocks'

export default {
  title: 'molecules/MovieCardList',
  component: MovieCardList,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof MovieCardList>> = (args) => (
  <MovieCardList {...args} />
)

export const Default = Template.bind({})
Default.args = {
  films: mockFilms,
}
