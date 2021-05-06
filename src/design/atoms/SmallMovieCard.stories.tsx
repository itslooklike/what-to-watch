/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Story, Meta } from '@storybook/react'
import { mockFilm } from '~/store/FilmsStore/moks'
import { SmallMovieCard } from './SmallMovieCard'

export default {
  title: 'atoms/SmallMovieCard',
  component: SmallMovieCard,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof SmallMovieCard>> = (args) => (
  <SmallMovieCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  film: mockFilm,
}
Default.decorators = [
  (Story) => (
    <div style={{ width: 300, margin: '1em' }}>
      <Story />
    </div>
  ),
]
