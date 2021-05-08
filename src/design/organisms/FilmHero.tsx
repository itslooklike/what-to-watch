import Link from 'next/link'
import { useRouter } from 'next/router'
import { css, cx } from 'linaria'
import { styled } from 'linaria/react'
import { observer } from 'mobx-react-lite'

import { Button } from '~/design/atoms'
import { Header } from '~/design/molecules'
import { usePlayerModal, useToggleFavorite } from '~/store/hooks'
import type { IFilm } from '~/store/FilmsStore'

const Root = styled.section`
  position: relative;
  z-index: 1;
  flex-grow: 1;
  padding-bottom: 45px;
  color: var(--color-primary);
  background-color: var(--color-secondary);
`

const Hero = styled.div`
  position: relative;
  z-index: 1;
  min-height: 555px;
  padding-bottom: 250px;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;

  ::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: var(--color-black-opacity);
    content: '';
  }
`

const BackgroundImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  vertical-align: top;
`

const Wrap = styled.div`
  max-width: var(--base-content-width);
  margin-right: auto;
  margin-left: auto;
  padding: 0 var(--base-content-padding);
`

const Description = styled.div`
  flex-grow: 1;
`

const Title = styled.h2`
  margin: 0 0 7px;
  font-size: 32px;
  font-family: 'Arial Black', sans-serif;
  line-height: 45px;
`

const Meta = styled.p`
  display: flex;
  margin: 0 0 20px;
  font-size: 17px;
  line-height: 20px;
`

const Genre = styled.span`
  ::after {
    margin-right: 4px;
    margin-left: 4px;
    content: '·';
  }
`

const ButtonsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`

const TranslateTop = styled.div`
  position: relative;
  z-index: 2;
  max-width: var(--base-content-width);
  margin-top: -40px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 var(--base-content-padding);
`

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`

const Poster = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 273px;
  height: 200px;
  box-shadow: 0 0 8px 0 var(--color-black-opacity);
`

const PosterImg = styled.img`
  position: absolute;
  top: -200px;
  left: 0;
  width: 273px;
  height: 410px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 5px;
`

const ContentWrap = styled.div`
  flex: 1 1 auto;
`

const Content = styled.div`
  max-width: 635px;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
`

const NavListItem = styled.li`
  margin-right: 35px;

  :last-child {
    margin-right: 0;
  }
`

const stylesLink = css`
  position: relative;
  display: block;
  padding-bottom: 19px;
  color: var(--color-primary);
  text-decoration: none;

  ::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: none;
    height: 4px;
    background-color: var(--color-primary);
    content: '';
  }

  :hover::after,
  &.active::after {
    display: block;
  }
`

const Navigation = ({ filmId }: { filmId: number | string }) => {
  const router = useRouter()

  const list = [
    {
      url: `/m/${filmId}`,
      text: 'Overview',
    },
    {
      url: `/m/${filmId}/details`,
      text: 'Details',
    },
    {
      url: `/m/${filmId}/reviews`,
      text: 'Reviews',
    },
  ]

  return (
    <NavList>
      {list.map((item, idx) => (
        <NavListItem key={idx}>
          <Link href={item.url} scroll={false}>
            <a className={cx(stylesLink, router?.asPath === item.url && 'active')}>{item.text}</a>
          </Link>
        </NavListItem>
      ))}
    </NavList>
  )
}

type TProps = {
  film: IFilm
  content: React.ReactNode
}

export const FilmHero = observer((props: TProps) => {
  const { film, content } = props

  const { playerModal, handleOpenPlayer } = usePlayerModal(film)

  const { handleFavorite, loadingUpdate } = useToggleFavorite(film)

  return (
    <Root>
      {playerModal}
      <Hero>
        <Background>
          <BackgroundImg src={film.background_image} alt={film.name} />
        </Background>
        <Header />
        <Wrap>
          <Description>
            <Title>{film.name}</Title>
            <Meta>
              <Genre>{film.genre}</Genre>
              <span>{film.released}</span>
            </Meta>

            <ButtonsWrap>
              <Button icon="IconPlay" onClick={handleOpenPlayer}>
                Play
              </Button>
              <Button
                loading={loadingUpdate}
                icon={film.is_favorite ? 'IconInList' : 'IconAdd'}
                onClick={handleFavorite}
              >
                My list
              </Button>
              <Link href={`/m/${film.id}/add-review`}>
                <Button asTag="a" icon="IconAdd">
                  Add review
                </Button>
              </Link>
            </ButtonsWrap>
          </Description>
        </Wrap>
      </Hero>

      <TranslateTop>
        <Info>
          <Poster>
            <PosterImg
              src={film.poster_image}
              alt={`${film.name} poster`}
              width="218"
              height="327"
            />
          </Poster>
          <ContentWrap>
            <Nav>
              <Navigation filmId={film.id} />
            </Nav>
            <Content>{content}</Content>
          </ContentWrap>
        </Info>
      </TranslateTop>
    </Root>
  )
})
