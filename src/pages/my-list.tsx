import type { NextPage } from 'next'

import { ContentWrap } from '~/design/atoms'
import { Footer, Header, MovieCardList } from '~/design/molecules'
import { useMobxStores } from '~/store'

const MyList: NextPage = () => {
  const { favoriteStore } = useMobxStores()

  return (
    <div>
      <Header />
      <ContentWrap>
        <MovieCardList films={favoriteStore.data} />
      </ContentWrap>
      <Footer />
    </div>
  )
}

MyList.getInitialProps = async ({ mobxStores }) => {
  await mobxStores.favoriteStore.fetchFavorite()
  return {}
}

export default MyList
