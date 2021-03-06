import React from 'react'
import { css, cx } from '@linaria/core'
import { styled } from '@linaria/react'

import * as Icons from '~/icons'

const styles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 128px;
  padding: 13px 30px;
  color: var(--color-primary);
  font-size: 17px;
  line-height: 20px;
  text-decoration: none;
  background-color: var(--color-black-dark);
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s background-color, 0.2s transform;
  will-change: transform;

  :hover {
    background-color: var(--color-black-opacity);
    transform: scale(1.1);
  }
`

const Content = styled.span`
  display: flex;
  align-items: center;
`

const IconWrap = styled.span`
  position: relative;
  top: -1px;
  display: flex;
  align-items: center;
  margin-right: 10px;

  svg {
    display: inline-flex;
  }
`

type TProps = {
  asTag?: string
  className?: string
  icon?: keyof typeof Icons
  loading?: boolean
  onClick?: VoidFunction
}

export const Button: React.FC<React.PropsWithChildren<TProps>> = React.forwardRef((props, ref) => {
  const { children, loading, className, icon, asTag = 'button', ...rest } = props

  const Icon = (() => {
    if (loading) return Icons.Spinner
    if (icon) return Icons[icon]
    return undefined
  })()

  return React.createElement(
    asTag,
    { className: cx(styles, className), ref, ...rest },
    <Content>
      {Icon && (
        <IconWrap>
          <Icon height="20" />
        </IconWrap>
      )}
      <span>{children}</span>
    </Content>
  )
})
