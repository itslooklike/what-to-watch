import { useState, forwardRef } from 'react'
import { css } from 'linaria'
import { styled } from 'linaria/react'

import type { IFilm } from '~/store/FilmsStore'

const Root = styled.article`
  position: relative;
  overflow: hidden;
  border-radius: 6px;
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
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.63) 97%);
    content: '';
  }
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
`

const Title = styled.h3`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  margin: 0;
  padding: 10px 15px;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
`

const stylesLink = css`
  display: inline-block;
  color: inherit;
  text-decoration: none;
  vertical-align: top;
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
          <Video src={film.video_link} autoPlay poster={film.preview_image} muted />
        ) : (
          <Img src={film.preview_image} alt={film.name} width="280" height="175" loading="lazy" />
        )}
      </ImgWrap>
      <Title>
        <a className={stylesLink} ref={ref} href={href} onClick={onClick}>
          {film.name}
        </a>
      </Title>
    </Root>
  )
})
