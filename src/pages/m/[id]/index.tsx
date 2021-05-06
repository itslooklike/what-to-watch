import Head from 'next/head'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'

import { FilmOverview } from '~/design/atoms'
import { FilmLayout } from '~/design/templates'
import { getInitialFilms } from '~/utils/getInitialFilms'
import { SeoHead } from '~/utils/SeoHead'
import { useMobxStores } from '~/store'

const MovieIndex: NextPage = () => {
  const { filmsStore } = useMobxStores()
  const router = useRouter()
  const id = router.query.id as string

  const film = filmsStore.selectFilmById(id)

  if (!film) {
    return <>404</>
  }

  return (
    <>
      <Head>
        <title>WTW - {film.name}</title>
      </Head>
      <SeoHead film={filmsStore.firstFilm} />
      <FilmLayout film={film}>
        <FilmOverview film={film} />
      </FilmLayout>
    </>
  )
}

MovieIndex.getInitialProps = getInitialFilms

export default observer(MovieIndex)
