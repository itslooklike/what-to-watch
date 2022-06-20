import Link from 'next/link'
import { useRouter } from 'next/router'
import { css, cx } from '@linaria/core'
import { styled } from '@linaria/react'

import { CardList } from '~/design/molecules'
import { useFilmsPagination } from '~/store/hooks'
import { useMobxStores } from '~/store'

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 20px;
  padding-left: 0;
  list-style: none;
`

const stylesLink = css`
  position: relative;
  display: block;
  padding: 25px 10px 5px;
  color: var(--color-primary-dark);
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
    background-color: var(--color-primary-dark);
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
  color: var(--color-primary-dark);
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  background: none;
  border: 1px solid rgba(217, 202, 116, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s;

  :hover {
    border-color: var(--color-primary-dark-opacity);
  }
`

export const Catalog = () => {
  const { filmsStore } = useMobxStores()

  const router = useRouter()

  const genre = router?.query.genre as string

  const [currentFilms, handleMore, isHasMore] = useFilmsPagination(genre)

  return (
    <div>
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
      <CardList films={currentFilms} />
      {isHasMore && (
        <ButtonWrap>
          <ButtonMore type="button" onClick={handleMore}>
            Show more
          </ButtonMore>
        </ButtonWrap>
      )}
    </div>
  )
}
