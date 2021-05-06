import type { NextPage } from 'next'

import { Footer, Header, MovieCardList } from '~/design/molecules'
import { useMobxStores } from '~/store'

const MyList: NextPage = () => {
  const { favoriteStore } = useMobxStores()

  return (
    <div>
      <Header />
      <div>
        <MovieCardList films={favoriteStore.data} />
      </div>
      <Footer />
    </div>
  )
}

MyList.getInitialProps = async ({ mobxStores }) => {
  await mobxStores.favoriteStore.fetchFavorite()
  return {}
}

export default MyList
