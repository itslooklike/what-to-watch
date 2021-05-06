import React from 'react'
import { css, cx } from 'linaria'

const stylesInput = css`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 25px 20px;
  color: #dfcf77;
  font-weight: 300;
  font-size: 30px;
  line-height: 44px;
  background: #2b1b1b;
  border: 1px solid transparent;
  border-radius: 8px;
  transition: border-color 0.2s;

  &.error {
    border-color: #a8421e;
  }
`

type TProps = {
  onChange: (_: string) => void
  id: string
  type?: string
  placeholder?: string
  isError?: boolean
}

export const Input = (props: TProps) => {
  const { onChange, type = 'text', placeholder, id, isError } = props

  return (
    <div>
      <input
        className={cx(stylesInput, isError && 'error')}
        onChange={(event) => {
          onChange(event.target.value)
        }}
        type={type}
        placeholder={placeholder}
        id={id}
      />
      <label htmlFor={id} className={cx('visually-hidden')}>
        {placeholder}
      </label>
    </div>
  )
}
