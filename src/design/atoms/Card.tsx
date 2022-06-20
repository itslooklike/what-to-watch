import { useState, forwardRef, useRef, useEffect } from 'react'
import { css, cx } from '@linaria/core'
import { styled } from '@linaria/react'

import type { IFilm } from '~/store/FilmsStore'

const Root = styled.article`
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  transition: 0.2s transform;

  :hover {
    z-index: 3;
    transform: scale(1.05);
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
    background-image: linear-gradient(
      180deg,
      hsla(0, 0%, 35.29%, 0) 0%,
      hsla(0, 0%, 34.53%, 0.034375) 16.36%,
      hsla(0, 0%, 32.42%, 0.125) 33.34%,
      hsla(0, 0%, 29.18%, 0.253125) 50.1%,
      hsla(0, 0%, 24.96%, 0.4) 65.75%,
      hsla(0, 0%, 19.85%, 0.546875) 79.43%,
      hsla(0, 0%, 13.95%, 0.675) 90.28%,
      hsla(0, 0%, 7.32%, 0.765625) 97.43%,
      hsla(0, 0%, 0%, 0.8) 100%
    );
    content: '';
  }
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
`

const styleSubtext = css`
  position: absolute;
  z-index: 2;
  color: var(--color-primary);
  transition: all 0.5s;

  &.light {
    opacity: 0.2;
    transition: all 4s;
  }
`

const LeftSlot = styled.h3`
  right: 50px;
  bottom: 10px;
  left: 15px;
  margin: 0;
  font-weight: 500;
  font-size: 17px;
`

const RightSlot = styled.span`
  right: 15px;
  bottom: 9px;
  font-size: 12px;
`

const Video = styled.video`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

type TProps = {
  film: IFilm
  onClick?: VoidFunction
  href?: string
}

export const Card = forwardRef<HTMLAnchorElement, TProps>((props, ref) => {
  const { film, onClick, href } = props

  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const [isHover, setHover] = useState(false)

  const handleHover = () => {
    timerRef.current = setTimeout(() => {
      setHover(true)
    }, 1_500)
  }

  const handleLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    if (isHover) {
      setHover(false)
    }
  }

  const isShowVideo = isHover && film.videoLink

  /* eslint-disable-next-line arrow-body-style */
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return (
    <a ref={ref} href={href} onClick={onClick}>
      <Root onMouseEnter={handleHover} onMouseLeave={handleLeave}>
        <ImgWrap>
          {isShowVideo ? (
            <Video src={film.videoLink} autoPlay poster={film.imagePreview.url} muted />
          ) : (
            <Img
              src={film.imagePreview.url}
              alt={film.name}
              width="280"
              height="175"
              loading="lazy"
            />
          )}
        </ImgWrap>
        <LeftSlot className={cx(styleSubtext, isShowVideo && 'light')}>{film.name}</LeftSlot>
        <RightSlot className={cx(styleSubtext, isShowVideo && 'light')}>★ {film.rating}</RightSlot>
      </Root>
    </a>
  )
})
