import React from 'react'
import { enableStaticRendering } from 'mobx-react-lite'

import { isServer } from '~/utils/env'
import { FilmsStore } from './FilmsStore'
import { UserStore } from './UserStore'
import { FavoriteStore } from './FavoriteStore'
import { CommentsStore } from './CommentsStore'

if (isServer) {
  enableStaticRendering(true)
}

export interface IStore {
  filmsStore: FilmsStore
  userStore: UserStore
  favoriteStore: FavoriteStore
  commentsStore: CommentsStore
}

let clientSideStores: IStore

export function getStores(
  initialData = {
    filmsStoreInitialData: {},
    userStoreInitialData: {},
    favoriteStoreInitialData: {},
    commentsStoreInitialData: {},
  }
) {
  if (isServer) {
    return {
      filmsStore: new FilmsStore(initialData.filmsStoreInitialData),
      userStore: new UserStore(initialData.userStoreInitialData),
      favoriteStore: new FavoriteStore(initialData.favoriteStoreInitialData),
      commentsStore: new CommentsStore(initialData.commentsStoreInitialData),
    }
  }

  if (!clientSideStores) {
    clientSideStores = {
      filmsStore: new FilmsStore(initialData.filmsStoreInitialData),
      userStore: new UserStore(initialData.userStoreInitialData),
      favoriteStore: new FavoriteStore(initialData.favoriteStoreInitialData),
      commentsStore: new CommentsStore(initialData.commentsStoreInitialData),
    }
  }

  return clientSideStores
}

export type TInitialStoreData = Parameters<typeof getStores>[0]

// @ts-ignore
const StoreContext = React.createContext<IStore>({})

type TStoreProvider = {
  value: IStore
  children: React.ReactElement
}

export function StoreProvider(props: TStoreProvider) {
  const { value, children } = props
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useMobxStores() {
  return React.useContext(StoreContext)
}
