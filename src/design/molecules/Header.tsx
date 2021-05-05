import { styled } from 'linaria/react'

import { IconUser } from '~/icons'
import { Logo } from '~/design/atoms'

const Root = styled.div`
  display: flex;
  align-items: center;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
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

const Title = styled.div`
  margin: 0 20px;
  color: #eee5b5;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none;

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;

    :hover {
      opacity: 0.5;
    }
  }
`

type TProps = {
  title?: string | React.ReactElement
}

export function Header(props: TProps) {
  const { title } = props

  return (
    <Root>
      <Logo />
      {title && <Title>{title}</Title>}
      <UserBlock>
        <Avatar>
          <IconUser width="63" height="63" />
        </Avatar>
      </UserBlock>
    </Root>
  )
}
