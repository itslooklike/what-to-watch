import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FilmDetails } from '~/design/atoms'
import { FilmLayout } from '~/design/templates'
import { getInitialFilms } from '~/utils/getInitialFilms'
import { useMobxStores } from '~/store'

const MoviePageDetails: NextPage = () => {
  const { filmsStore } = useMobxStores()
  const router = useRouter()
  const id = router.query.id as string

  const film = filmsStore.selectFilmById(id)

  if (!film) {
    return <>404</>
  }

  return (
    <FilmLayout film={film}>
      <FilmDetails film={film} />
    </FilmLayout>
  )
}

MoviePageDetails.getInitialProps = getInitialFilms

export default MoviePageDetails
