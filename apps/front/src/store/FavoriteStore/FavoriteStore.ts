import { makeAutoObservable, runInAction } from 'mobx'
import { gql } from 'graphql-request'

import { graphQLClient } from '~/utils/api'
import type { IStore } from '~/store'
import type { IFilm } from '~/store/FilmsStore'

const queryFavoriteFilms = gql`
  query favoriteFilms($id: ID!) {
    user(where: { id: $id }) {
      favoriteFilms {
        id
        name
        description
        released
        backgroundColor
        rating
        scoresCount
        director
        videoLink
        videoPreviewLink
        runTime
        genre {
          id
          name
        }
        starring {
          id
          name
        }
        imagePoster {
          url
        }
        imagePreview {
          url
        }
        imageBackground {
          url
        }
      }
    }
  }
`

const mutateUpdateUser = gql`
  mutation mutateUpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      id
    }
  }
`

export class FavoriteStore {
  rootStore

  loading = false

  loadingUpdate = false

  data: IFilm[] = []

  error = null

  constructor(initialData: Partial<FavoriteStore> = {}, rootStore: IStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
    this.data = initialData.data || []
  }

  hydrate() {
    return {
      data: this.data,
    }
  }

  async fetchFavorite() {
    this.loading = true

    try {
      const { user } = await graphQLClient.request(queryFavoriteFilms, {
        id: this.rootStore.userStore.user?.id,
      })

      runInAction(() => {
        this.loading = false
        this.error = null
        this.data = user.favoriteFilms
      })
    } catch (error: any) {
      runInAction(() => {
        this.loading = false
        this.error = error
      })
    }
  }

  async add(id: string) {
    this.loadingUpdate = true

    await graphQLClient.request(mutateUpdateUser, {
      where: { id: this.rootStore.userStore.user?.id },
      data: { favoriteFilms: { connect: { id } } },
    })

    const newFilm = this.rootStore.filmsStore.data.find((film) => film.id === id)

    runInAction(() => {
      this.data.push(newFilm!)
      this.loadingUpdate = false
    })
  }

  async remove(id: string) {
    this.loadingUpdate = true

    await graphQLClient.request(mutateUpdateUser, {
      where: { id: this.rootStore.userStore.user?.id },
      data: { favoriteFilms: { disconnect: { id } } },
    })

    const filtered = this.data.filter((film) => film.id !== id)

    runInAction(() => {
      this.data = filtered
      this.loadingUpdate = false
    })
  }
}
