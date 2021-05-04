import { styled } from 'linaria/react'
import { IFilm } from '../store/FilmsStore'
import { FilmCard } from '../components/FilmCard'
import { MovieCardList } from '../components/MovieCardList'
import { Footer } from '../components/Footer'
import { PageContent } from '../components/PageContent'
import { useMobxStores } from '../store'

const Root = styled.section`
  margin-bottom: 160px;
  max-width: 1300px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 30px 75px 0;
`

const Title = styled.div`
  margin: 0 0 12px;
  font-size: 22px;
  line-height: 26px;
  color: #dfcf77;
  font-weight: 400;
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
