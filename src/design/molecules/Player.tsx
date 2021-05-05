import ReactPlayer from 'react-player'
import { styled } from 'linaria/react'

import { Button } from '~/design/atoms'
import type { IFilm } from '~/store/FilmsStore'

const Root = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: #000;
`

const ButtonWrap = styled.div`
  position: absolute;
  top: 37px;
  right: 32px;
  z-index: 2;
`

type TProps = {
  film: IFilm
  onClose: VoidFunction
}

export function Player({ film, onClose }: TProps) {
  return (
    <Root>
      <ReactPlayer width="100%" height="100%" url={film.video_link} controls playing />
      <ButtonWrap>
        <Button onClick={onClose}>Exit</Button>
      </ButtonWrap>
    </Root>
  )
}
