import Head from 'next/head'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import type { NextPage } from 'next'

import { Overview } from '~/design/atoms'
import { FilmTemplate } from '~/design/templates'
import { getInitialFilms } from '~/store/utils'
import { SeoHead } from '~/design/utils'
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
      <SeoHead film={filmsStore.firstFilm} url={router.asPath} />
      <FilmTemplate film={film}>
        <Overview film={film} />
      </FilmTemplate>
    </>
  )
}

MovieIndex.getInitialProps = getInitialFilms

export default observer(MovieIndex)
