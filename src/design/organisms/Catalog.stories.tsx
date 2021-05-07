import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Catalog } from './Catalog'

import { getStores, StoreProvider, TInitialStoreData } from '~/store'
import { mockFilms } from '~/store/FilmsStore/mocks'

export default {
  title: 'organisms/Catalog',
  component: Catalog,
} as Meta

const Template: Story<React.ComponentProps<typeof Catalog>> = () => <Catalog />

export const Default = Template.bind({})
Default.decorators = [
  (Story) => {
    const initialStoreData: TInitialStoreData = {
      filmsStoreInitialData: {
        data: mockFilms,
      },
      userStoreInitialData: {},
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
