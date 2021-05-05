import Link from 'next/link'
import { useRouter } from 'next/router'
import { css, cx } from 'linaria'
import { styled } from 'linaria/react'

import { MovieCardList } from '~/design/molecules'
import { useFilmsPagination } from '~/utils/useFilmsPagination'
import { useMobxStores } from '~/store'
import type { TGenre } from '~/store/FilmsStore'

const Root = styled.section`
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-bottom: 115px;
  margin-left: auto;
  padding: 0 75px;
`

const List = styled.ul`
  display: grid;
  grid-auto-flow: column;
  gap: 20px;
  justify-content: left;
  margin: 0;
  padding: 25px 0;
  list-style: none;
`

const stylesLink = css`
  position: relative;
  display: block;
  color: #dfcf77;
  text-decoration: none;
  transition: font-weight;

  ::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: none;
    height: 1px;
    background-color: #d9cd8d;
    content: '';
  }

  :not(&.active):hover::after {
    display: block;
  }

  &.active {
    opacity: 0.4;
  }
`

const ButtonWrap = styled.div`
  margin-top: 50px;
`

const ButtonMore = styled.button`
  display: block;
  width: 100%;
  padding: 29px 40px;
  color: #d9ca74;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  background: none;
  border: 1px solid rgba(217, 202, 116, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s;

  :hover {
    border-color: rgba(217, 202, 116, 0.5);
  }
`

export const Catalog = () => {
  const { filmsStore } = useMobxStores()
  const { query } = useRouter()
  const genre = query.genre as TGenre
  const [currentFilms, handleMore, isHasMore] = useFilmsPagination(genre)

  return (
    <Root>
      <List>
        <li>
          <Link href="/" scroll={false}>
            <a className={cx(stylesLink, !genre && 'active')}>All genres</a>
          </Link>
        </li>
        {filmsStore.filmGenres.map((genreItem, idx) => (
          <li key={idx}>
            <Link href={`/?genre=${genreItem}`} scroll={false}>
              <a className={cx(stylesLink, genre === genreItem && 'active')}>{genreItem}</a>
            </Link>
          </li>
        ))}
      </List>
      <MovieCardList films={currentFilms} />
      {isHasMore && (
        <ButtonWrap>
          <ButtonMore type="button" onClick={handleMore}>
            Show more
          </ButtonMore>
        </ButtonWrap>
      )}
    </Root>
  )
}
