import { styled } from 'linaria/react'

import { ContentWrap } from '~/design/atoms'
import { MovieCardList, Footer } from '~/design/molecules'
import { FilmCard } from '~/design/organisms'
import { useMobxStores } from '~/store'
import type { IFilm } from '~/store/FilmsStore'

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
  const { children, film } = props

  const { filmsStore } = useMobxStores()

  const films = filmsStore.selectLikeThis(film)

  return (
    <div>
      <FilmCard film={film} content={children} />
      <ContentWrap>
        {films.length > 0 && (
          <div>
            <Title>More like this</Title>
            <MovieCardList films={films} />
          </div>
        )}
      </ContentWrap>
      <Footer />
    </div>
  )
}
