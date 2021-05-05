import { styled } from 'linaria/react'

import { PageContent } from '~/design/atoms'
import { MovieCardList, Footer } from '~/design/molecules'
import { FilmCard } from '~/design/organisms'
import { useMobxStores } from '~/store'
import type { IFilm } from '~/store/FilmsStore'

const Root = styled.section`
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-bottom: 160px;
  margin-left: auto;
  padding: 30px 75px 0;
`

const Title = styled.div`
  margin: 0 0 12px;
  color: #dfcf77;
  font-weight: 400;
  font-size: 22px;
  line-height: 26px;
`

type TProps = {
  film: IFilm
}

export const FilmLayout: React.FC<TProps> = (props) => {
  const { filmsStore } = useMobxStores()
  const { children, film } = props

  return (
    <div>
      <FilmCard film={film} content={children} />
      <PageContent>
        <Root>
          <Title>More like this</Title>
          <MovieCardList films={filmsStore.selectLikeThis(film)} />
        </Root>
        <Footer />
      </PageContent>
    </div>
  )
}
