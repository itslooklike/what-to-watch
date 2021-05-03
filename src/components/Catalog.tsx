import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled } from 'linaria/react'
import { observer } from 'mobx-react-lite'
import FilmsStore, { TGenre } from '../store/FilmsStore'
import { MovieCardList } from '../components/MovieCardList'

const Root = styled.section`
  margin-bottom: 115px;
  max-width: 1300px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 75px;
`

const List = styled.ul`
  padding: 25px 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`

const ListItem = styled.li`
  margin-right: 20px;
  margin-bottom: 20px;
`

const ListLink = styled.a`
  display: block;
  color: #dfcf77;
  text-decoration: none;
  position: relative;
  padding-bottom: 15px;
  transition: font-weight;
  cursor: pointer;

  ::after {
    content: '';
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    height: 1px;
    bottom: 0;
    background-color: #d9cd8d;
    display: none;
  }

  :hover::after {
    display: block;
  }

  &.active {
    opacity: 0.7;
  }
`

const ButtonMore = styled.button`
  display: block;
  width: 100%;
  padding: 29px 40px;
  background: none;
  border: 1px solid rgba(217, 202, 116, 0.2);
  border-radius: 8px;
  transition: border-color 0.2s;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  color: #d9ca74;
  cursor: pointer;

  :hover {
    border-color: rgba(217, 202, 116, 0.5);
  }
`

export const Catalog = observer(() => {
  const { query } = useRouter()
  const genre = query.genre as TGenre

  return (
    <Root>
      <List>
        <ListItem>
          <Link href="/" scroll={false}>
            <ListLink className={genre ? '' : 'active'}>All genres</ListLink>
          </Link>
        </ListItem>
        {FilmsStore.filmGenres.map((genreItem, idx) => {
          return (
            <ListItem key={idx}>
              <Link href={`/?genre=${genreItem}`} scroll={false}>
                <ListLink className={genre === genreItem ? 'active' : ''}>{genreItem}</ListLink>
              </Link>
            </ListItem>
          )
        })}
      </List>
      <MovieCardList films={FilmsStore.selectFilmsByGenre(genre)} />
      <div>
        <ButtonMore type="button">Show more</ButtonMore>
      </div>
    </Root>
  )
})
