import Link from 'next/link'
import { css } from 'linaria'
import { styled } from 'linaria/react'
import { observer } from 'mobx-react-lite'

import { IconUser } from '~/icons'
import { Logo } from '~/design/atoms'
import { apiUrl } from '~/utils/config'
import { useMobxStores } from '~/store'

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

const stylesAvatar = css`
  display: block;
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

const Avatar = styled.img`
  object-fit: cover;
`

type TProps = {
  title?: string | React.ReactElement
}

export const Header = observer((props: TProps) => {
  const { title } = props
  const { userStore } = useMobxStores()

  return (
    <Root>
      <Logo />
      {title && <Title>{title}</Title>}
      <UserBlock>
        <Link href="/login">
          <a className={stylesAvatar}>
            {userStore.user ? (
              <Avatar width="63" height="63" src={apiUrl + userStore.user.avatar_url} />
            ) : (
              <IconUser width="63" height="63" />
            )}
          </a>
        </Link>
      </UserBlock>
    </Root>
  )
})
