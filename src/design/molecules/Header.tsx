import { styled } from 'linaria/react'

import { IconUser } from '~/icons'
import { Logo } from '~/design/atoms'

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

export function Header() {
  return (
    <Root>
      <Logo />
      <UserBlock>
        <Avatar>
          <IconUser width="63" height="63" />
        </Avatar>
      </UserBlock>
    </Root>
  )
}
