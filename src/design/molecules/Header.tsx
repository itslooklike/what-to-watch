import Link from 'next/link'
import { css, cx } from 'linaria'
import { styled } from 'linaria/react'
import { observer } from 'mobx-react-lite'

import { IconUser } from '~/icons'
import { Logo } from '~/design/atoms'
import { apiUrl } from '~/utils/config'
import { useMobxStores } from '~/store'

const avatarSize = 63

const Root = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: var(--base-content-width);
  margin-right: auto;
  margin-left: auto;
  padding: 20px var(--base-content-padding);
`

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  min-height: ${avatarSize}px;
`

const UserBlock = styled.div`
  margin-left: auto;
`

const stylesAvatar = css`
  display: block;
  width: ${avatarSize}px;
  height: ${avatarSize}px;
  overflow: hidden;
  border-radius: 50%;
`

const Title = styled.div`
  margin: 0 20px;
  color: var(--color-primary);
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

  &.center {
    position: absolute;
    right: 200px;
    left: 200px;
    margin: 0 auto;
    text-align: center;
  }
`

const Avatar = styled.img`
  object-fit: cover;
`

type TProps = {
  title?: string | React.ReactElement
  centerTitle?: boolean
  hideUser?: boolean
}

export const Header = observer((props: TProps) => {
  const { title, centerTitle, hideUser } = props
  const { userStore } = useMobxStores()

  return (
    <Root>
      <LogoWrap>
        <Logo />
      </LogoWrap>
      {title && <Title className={cx(centerTitle && 'center')}>{title}</Title>}
      {!hideUser && (
        <UserBlock>
          <Link href="/my-list">
            <a className={stylesAvatar}>
              {userStore.user ? (
                <Avatar
                  width={avatarSize}
                  height={avatarSize}
                  src={apiUrl + userStore.user.avatar_url}
                />
              ) : (
                <IconUser width={avatarSize} height={avatarSize} />
              )}
            </a>
          </Link>
        </UserBlock>
      )}
    </Root>
  )
})
