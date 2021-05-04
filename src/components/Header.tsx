import { styled } from 'linaria/react'
import { Logo } from '../components/Logo'

const Root = styled.div`
  display: flex;
  align-items: center;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  padding: 22px 75px;
`

const UserBlock = styled.div`
  margin-left: auto;
`

const Avatar = styled.div`
  width: 63px;
  height: 63px;
  overflow: hidden;
  border-radius: 50%;
`

const AvatarImg = styled.img`
  vertical-align: top;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export function Header() {
  return (
    <Root>
      <Logo />
      <UserBlock>
        <Avatar>
          <AvatarImg src="/img/icons/icon-user.svg" alt="User avatar" width="63" height="63" />
        </Avatar>
      </UserBlock>
    </Root>
  )
}
