import Head from 'next/head'
import type { NextPage } from 'next'
import { observer } from 'mobx-react-lite'

import { ContentWrap } from '~/design/atoms'
import { Header, CardList } from '~/design/molecules'
import { LWithFooter } from '~/design/layouts'
import { useAuth } from '~/store/hooks'
import { getInitialFavorite } from '~/store/utils'
import { useMobxStores } from '~/store'

const MyList: NextPage = () => {
  useAuth()

  const { favoriteStore } = useMobxStores()

  return (
    <>
      <Head>
        <title>WTW - Favorites</title>
      </Head>
      <LWithFooter>
        <Header title="My Films" />
        <ContentWrap>
          {favoriteStore.data.length ? (
            <CardList films={favoriteStore.data} />
          ) : (
            <div>List empty</div>
          )}
        </ContentWrap>
      </LWithFooter>
    </>
  )
}

MyList.getInitialProps = getInitialFavorite

export default observer(MyList)
