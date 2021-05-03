import { useState, forwardRef } from 'react'
import { styled } from 'linaria/react'
import { IFilm } from '../store/FilmsStore'

const Root = styled.article`
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  transition: 0.2s transform;

  :hover {
    z-index: 3;
    transform: scale(1.1);
  }
`

const ImgWrap = styled.div`
  position: relative;
  z-index: 1;
  height: 175px;

  ::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.63) 97%);
  }
`

const Img = styled.img`
  vertical-align: top;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Title = styled.h3`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 15px;
  margin: 0;
  font-size: 17px;
  line-height: 20px;
  font-weight: 500;
`

const LinkTo = styled.a`
  display: inline-block;
  vertical-align: top;
  text-decoration: none;
  color: inherit;
`

const Video = styled.video`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

type TProps = {
  film: IFilm

  // FIXME: это должно пробрасываться
  onClick?: VoidFunction
  href?: string
}

export const SmallMovieCard = forwardRef<HTMLAnchorElement, TProps>((props, ref) => {
  const { film, onClick, href } = props

  const [isHover, setHover] = useState(false)

  const handleHover = () => setHover(true)

  const handleLeave = () => setHover(false)

  const isShowVideo = isHover && film.video_link

  return (
    <Root onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <ImgWrap>
        {isShowVideo ? (
          <Video src={film.video_link} autoPlay poster={film.poster_image} muted></Video>
        ) : (
          <Img src={film.poster_image} alt={film.name} width="280" height="175" />
        )}
      </ImgWrap>
      <Title>
        <LinkTo ref={ref} href={href} onClick={onClick}>
          {film.name}
        </LinkTo>
      </Title>
    </Root>
  )
})
