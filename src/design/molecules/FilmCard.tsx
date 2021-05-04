import Link from 'next/link'
import { useRouter } from 'next/router'
import { css, cx } from 'linaria'
import { styled } from 'linaria/react'

import { Button } from '~/design/atoms'
import { Header } from '~/design/molecules'
import type { IFilm } from '~/store/FilmsStore'

const Root = styled.section`
  position: relative;
  z-index: 1;
  color: #eee5b5;
  background-color: #e1b0b2;
  padding-bottom: 45px;
  min-height: 100vh;
`

const Hero = styled.div`
  position: relative;
  z-index: 1;
  min-height: 555px;
  padding-bottom: 210px;
`

const Background = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  ::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
  }
`

const BackgroundImg = styled.img`
  vertical-align: top;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`

const Wrap = styled.div`
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 75px;
`

const Description = styled.div`
  flex-grow: 1;
`

const Title = styled.h2`
  font-family: 'Arial Black', sans-serif;
  font-size: 32px;
  line-height: 45px;
  margin: 0 0 7px;
`

const Meta = styled.p`
  margin: 0;
  display: flex;
  font-size: 17px;
  line-height: 20px;
  margin: 0 0 20px;
`

const Genre = styled.span`
  ::after {
    content: '·';
    margin-left: 4px;
    margin-right: 4px;
  }
`

const ButtonsWrap = styled.div`
  display: flex;
  gap: 15px;
`

const TranslateTop = styled.div`
  margin-top: -170px;
  position: relative;
  z-index: 2;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 75px;
`

const Poster = styled.div`
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
  width: 273px;
  height: 410px;
  margin-right: 40px;
  flex-shrink: 0;
`

const PosterImg = styled.img`
  vertical-align: top;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Nav = styled.nav`
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const NavList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`

const NavListItem = styled.li`
  margin-right: 35px;

  :last-child {
    margin-right: 0;
  }
`

const stylesLink = css`
  display: block;
  color: #eee5b5;
  text-decoration: none;
  position: relative;
  padding-bottom: 19px;

  ::after {
    content: '';
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    height: 4px;
    bottom: 0;
    background: #eee5b5;
    display: none;
  }

  :hover::after,
  &.active::after {
    display: block;
  }
`

const Info = styled.div`
  display: flex;
  align-items: flex-start;
`

const Navigation = ({ filmId }: { filmId: number | string }) => {
  const { asPath } = useRouter()

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
            <a className={cx(stylesLink, asPath === item.url && 'active')}>{item.text}</a>
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

export const FilmCard = (props: TProps) => {
  const { film, content } = props

  return (
    <Root>
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
              <Button>Play</Button>
              <Button>My list</Button>
              <Link href="add-review.html">
                <Button asTag="a">Add review</Button>
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
          <div>
            <Nav>
              <Navigation filmId={film.id} />
            </Nav>
            <div>{content}</div>
          </div>
        </Info>
      </TranslateTop>
    </Root>
  )
}
