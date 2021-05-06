import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'

import { FilmOverview } from '~/design/atoms'
import { FilmLayout } from '~/design/templates'
import { getInitialFilms } from '~/utils/getInitialFilms'
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
    <FilmLayout film={film}>
      <FilmOverview film={film} />
    </FilmLayout>
  )
}

MovieIndex.getInitialProps = getInitialFilms

export default observer(MovieIndex)
