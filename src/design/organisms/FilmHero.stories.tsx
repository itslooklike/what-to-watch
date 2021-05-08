import React from 'react'
import { Story, Meta } from '@storybook/react'

import { FilmHero } from './FilmHero'

import { getStores, StoreProvider, TInitialStoreData } from '~/store'
import { mockFilm } from '~/store/FilmsStore/mocks'
import { mocksUser } from '~/store/UserStore/mocks'

export default {
  title: 'organisms/FilmHero',
  component: FilmHero,
} as Meta

const Template: Story<React.ComponentProps<typeof FilmHero>> = (args) => <FilmHero {...args} />

export const Default = Template.bind({})
Default.args = {
  film: mockFilm,
  content: <>CONTENT HERE</>,
}
Default.decorators = [
  (Story) => {
    const initialStoreData: TInitialStoreData = {
      filmsStoreInitialData: {},
      userStoreInitialData: {
        data: mocksUser,
      },
      favoriteStoreInitialData: {},
      commentsStoreInitialData: {},
    }

    const stores = getStores(initialStoreData)

    return (
      <StoreProvider value={stores}>
        <Story />
      </StoreProvider>
    )
  },
]
