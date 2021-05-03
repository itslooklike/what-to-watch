import { css } from 'linaria'
import React from 'react'

const className = css`
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

  img,
  svg {
    vertical-align: top;
    margin-right: 9px;
  }
`

type TProps = {
  asTag?: string
}

export const Button: React.FC<TProps> = React.forwardRef((props, ref) => {
  const { children, asTag = 'button', ...rest } = props

  return React.createElement(asTag, { className, ref, ...rest }, <span>{children}</span>)
})
