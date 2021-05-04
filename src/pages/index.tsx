import type { NextPage } from 'next'

import { Footer } from '~/components/Footer'
import { MovieCardHeader } from '~/components/MovieCardHeader'
import { PageContent } from '~/components/PageContent'
import { Catalog } from '~/components/Catalog'
import { useMobxStores } from '~/store'

const Home: NextPage = () => {
  const { filmsStore } = useMobxStores()

  return (
    <div>
      <MovieCardHeader film={filmsStore.firstFilm} />
      <PageContent>
        <Catalog />
        <Footer />
      </PageContent>
    </div>
  )
}

Home.getInitialProps = async ({ mobxStores }) => {
  await mobxStores.filmsStore.getFilms()
  return {}
}

export default Home
