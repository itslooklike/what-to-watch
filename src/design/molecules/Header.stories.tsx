import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Header } from './Header'

import { getStores, StoreProvider, TInitialStoreData } from '~/store'
import { mocksUser } from '~/store/UserStore/mocks'

export default {
  title: 'molecules/Header',
  component: Header,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof Header>> = (args) => <Header {...args} />

export const Default = Template.bind({})
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
