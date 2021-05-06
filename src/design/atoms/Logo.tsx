import Link from 'next/link'
import { cx, css } from 'linaria'
import { styled } from 'linaria/react'

const Root = styled.div`
  display: inline-flex;
`

const stylesLink = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 93px;
  height: 54px;
  color: var(--color-primary-dark);
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  border: 1px solid var(--color-primary-dark);
  border-radius: 8px;
  transition: color 0.2s, border-color 0.2s;

  &[href]:hover,
  &[href]:focus {
    color: var(--color-grey);
    border-color: var(--color-grey);
  }

  &.light {
    color: var(--color-grey);
    border: 1px solid rgba(84, 80, 62, 0.36);

    &[href]:hover,
    &[href]:focus {
      color: var(--color-primary);
      border-color: var(--color-grey-light);
    }
  }
`

const LogoLetter1 = styled.span`
  font-size: 26px;
  transform: rotate(-9deg) translateY(5px);
`

const LogoLetter2 = styled.span`
  font-size: 30px;
`

const LogoLetter3 = styled.span`
  font-size: 26px;
  transform: rotate(8deg) translateY(5px);
`

type TProps = {
  type?: 'light'
}

export const Logo = (props: TProps) => {
  const { type } = props

  return (
    <Root>
      <Link href="/">
        <a className={cx(stylesLink, type)}>
          <LogoLetter1>W</LogoLetter1>
          <LogoLetter2>T</LogoLetter2>
          <LogoLetter3>W</LogoLetter3>
        </a>
      </Link>
    </Root>
  )
}
