import React from 'react'
import { Story, Meta } from '@storybook/react'
import { MovieCardHeader } from './MovieCardHeader'

import { getStores, StoreProvider, TInitialStoreData } from '~/store'
import { mockFilm } from '~/store/FilmsStore/mocks'
import { mocksUser } from '~/store/UserStore/mocks'

export default {
  title: 'organisms/MovieCardHeader',
  component: MovieCardHeader,
} as Meta

const Template: Story<React.ComponentProps<typeof MovieCardHeader>> = (args) => (
  <MovieCardHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  film: mockFilm,
}
Default.decorators = [
  (Story) => {
    const initialStoreData: TInitialStoreData = {
      filmsStoreInitialData: {},
      userStoreInitialData: {
        data: mocksUser,
      },
      favoriteStoreInitialData: {},
    }

    const stores = getStores(initialStoreData)

    return (
      <StoreProvider value={stores}>
        <Story />
      </StoreProvider>
    )
  },
]
