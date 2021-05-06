import { styled } from 'linaria/react'

import { ContentWrap } from '~/design/atoms'
import { MovieCardList } from '~/design/molecules'
import { FilmCard } from '~/design/organisms'
import { BasicWithFooter } from '~/design/layouts'
import { useMobxStores } from '~/store'
import type { IFilm } from '~/store/FilmsStore'

const Title = styled.div`
  margin: 0 0 12px;
  color: var(--color-primary-dark);
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
    <BasicWithFooter>
      <FilmCard film={film} content={children} />
      {films.length > 0 && (
        <ContentWrap>
          <Title>More like this</Title>
          <MovieCardList films={films} />
        </ContentWrap>
      )}
    </BasicWithFooter>
  )
}
