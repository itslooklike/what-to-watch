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

const initialEmpty = {
  filmsStoreInitialData: {},
  userStoreInitialData: {},
  favoriteStoreInitialData: {},
  commentsStoreInitialData: {},
}

const createRootStore = (initialData: typeof initialEmpty) =>
  class RootStore implements IStore {
    filmsStore: FilmsStore

    userStore: UserStore

    favoriteStore: FavoriteStore

    commentsStore: CommentsStore

    constructor() {
      this.filmsStore = new FilmsStore(initialData.filmsStoreInitialData, this)
      this.userStore = new UserStore(initialData.userStoreInitialData, this)
      this.favoriteStore = new FavoriteStore(initialData.favoriteStoreInitialData, this)
      this.commentsStore = new CommentsStore(initialData.commentsStoreInitialData, this)
    }
  }

let clientSideStores: IStore

export function getStores(initialData = initialEmpty) {
  if (isServer) {
    const RootStore = createRootStore(initialData)
    return new RootStore()
  }

  if (!clientSideStores) {
    const RootStore = createRootStore(initialData)
    clientSideStores = new RootStore()
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
