import React from 'react'
import { Story, Meta } from '@storybook/react'

import { mockFilms } from '~/store/FilmsStore/mocks'
import { CardList } from './CardList'


export default {
  title: 'molecules/CardList',
  component: CardList,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof CardList>> = (args) => <CardList {...args} />

export const Default = Template.bind({})
Default.args = {
  films: mockFilms,
}
