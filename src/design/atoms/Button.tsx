import React from 'react'
import { css, cx } from 'linaria'
import { styled } from 'linaria/react'
import * as Icons from '~/icons'

const styles = css`
  display: inline-block;
  vertical-align: top;
  padding: 0;
  text-decoration: none;
  border: 0;
  background: none;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.26);
  border-radius: 8px;
  color: #eee5b5;
  font-size: 17px;
  line-height: 20px;
  padding: 13px 30px;
  transition: 0.2s background-color, 0.2s transform;
  will-change: transform;
  display: flex;
  align-items: center;
  min-width: 128px;

  :hover {
    background: rgba(0, 0, 0, 0.51);
    transform: scale(1.1);
  }
`

const Content = styled.span`
  display: flex;
  align-items: center;
`

const IconWrap = styled.span`
  position: relative;
  top: 1px;
  margin-right: 10px;
  align-self: center;
`

type TProps = {
  asTag?: string
  className?: string
  icon?: keyof typeof Icons
}

export const Button: React.FC<TProps> = React.forwardRef((props, ref) => {
  const { children, className, icon, asTag = 'button', ...rest } = props

  const Icon = icon ? Icons[icon] : undefined

  return React.createElement(
    asTag,
    { className: cx(styles, className), ref, ...rest },
    <Content>
      {Icon && (
        <IconWrap>
          <Icon width="20" />
        </IconWrap>
      )}
      <span>{children}</span>
    </Content>
  )
})
