import Link from 'next/link'
import { styled } from 'linaria/react'

const Root = styled.div`
  display: inline-flex;
`

const LogoLink = styled.div`
  border: 1px solid rgba(223, 207, 119, 0.36);
  border-radius: 8px;
  width: 93px;
  height: 54px;
  color: #d9cd8d;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-decoration: none;

  transition: color 0.2s, border-color 0.2s;

  &[href]:hover,
  &[href]:focus {
    border-color: rgba(84, 80, 62, 0.36);
    color: #54503e;
  }
`

const LogoLinkLight = styled.div`
  border: 1px solid rgba(84, 80, 62, 0.36);
  color: #54503e;
  border-radius: 8px;
  width: 93px;
  height: 54px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.2s, border-color 0.2s;

  &[href]:hover,
  &[href]:focus {
    border-color: rgba(223, 207, 119, 0.36);
    color: #d9cd8d;
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

export function Logo({ light }: { light?: boolean }) {
  return (
    <Root>
      <Link href="/">
        {light ? (
          <LogoLinkLight>
            <LogoLetter1>W</LogoLetter1>
            <LogoLetter2>T</LogoLetter2>
            <LogoLetter3>W</LogoLetter3>
          </LogoLinkLight>
        ) : (
          <LogoLink>
            <LogoLetter1>W</LogoLetter1>
            <LogoLetter2>T</LogoLetter2>
            <LogoLetter3>W</LogoLetter3>
          </LogoLink>
        )}
      </Link>
    </Root>
  )
}
