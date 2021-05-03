import React from 'react'
import { styled } from 'linaria/react'

const Root = styled.button`
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

export const Button: React.FC = ({ children }) => {
  return (
    <Root type="button">
      <span>{children}</span>
    </Root>
  )
}
