import { styled } from 'linaria/react'

import { IconPlay, IconFullScreen } from '~/icons'
import { Button } from '~/design/atoms'
import type { IFilm } from '~/store/FilmsStore'

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ButtonWrap = styled.div`
  position: absolute;
  z-index: 2;
  top: 37px;
  right: 32px;
`

const Controls = styled.div`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 25px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  :last-child {
    margin-bottom: 0;
  }
`

const PlayerTime = styled.div`
  flex-grow: 1;
  margin-right: 20px;
  position: relative;
`

const Progress = styled.progress`
  width: 100%;
  background: rgba(255, 251, 231, 0.35);
  border-radius: 1px;
  border: 0;
  height: 4px;
  display: block;
`

const Toggler = styled.div`
  display: block;
  font-size: 0;
  cursor: pointer;
  border-radius: 50%;
  background: #d9cd8d;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 17px;
  height: 17px;
`

const TimeValue = styled.div`
  width: 60px;
  flex-shrink: 0;
  text-align: right;
  font-size: 14px;
  color: #fff9d9;
`

const ButtonPlayer = styled.button`
  display: block;
  font-size: 0;
  cursor: pointer;
  width: 26px;
  height: 26px;
  border: 0;
  padding: 0;
  background: 0 0;
  transition: 0.2s transform;
`

const Name = styled.div`
  font-size: 17px;
  line-height: 20px;
  font-weight: 700;
  color: #b3ae98;
  margin: 0 30px;
`

type TProps = {
  film: IFilm
  onClose: VoidFunction
}

export function Player({ film, onClose }: TProps) {
  return (
    <Root>
      <Video src={film.video_link} poster={film.background_image}></Video>
      <ButtonWrap>
        <Button onClick={onClose}>Exit</Button>
      </ButtonWrap>
      <Controls>
        <Row>
          <PlayerTime>
            <Progress value="30" max="100"></Progress>
            <Toggler>Toggler</Toggler>
          </PlayerTime>
          <TimeValue>1:30:29</TimeValue>
        </Row>
        <Row>
          <ButtonPlayer type="button">
            <IconPlay width="20" />
            <span>Play</span>
          </ButtonPlayer>
          <Name>Transpotting</Name>
          <ButtonPlayer type="button">
            <IconFullScreen width="20" />
            <span>Full screen</span>
          </ButtonPlayer>
        </Row>
      </Controls>
    </Root>
  )
}
