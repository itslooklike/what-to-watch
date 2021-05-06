import React from 'react'
import { styled } from 'linaria/react'

const Root = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 15px;
`

const Input = styled.input`
  display: none;
`

const Label = styled.label`
  display: block;
  font-size: 0;
  line-height: 0;
  cursor: pointer;

  ::after {
    display: block;
    color: rgba(56, 44, 42, 0.7);
    font-size: 32px;
    line-height: 36px;
    transition: color 0.2s;
    content: '★';
  }

  ${Input}:checked ~ &::after {
    color: rgba(56, 44, 42, 0.36);
  }

  ${Input}:checked + &::after {
    color: rgba(56, 44, 42, 0.7);
  }
`

type TProps = {
  name: string
  currentRating: string
  onChange: (_: string) => void
}

export const RatingStars = ({ name, onChange, currentRating }: TProps) => (
  <Root>
    {Array.from({ length: 5 }).map((_, idx) => {
      const value = idx + 1
      const index = `star-${value}`
      const checked = `star-${currentRating}` === index

      return (
        <React.Fragment key={idx}>
          <Input
            id={index}
            type="radio"
            name={name}
            value={value}
            onChange={(evt) => onChange(evt.target.value)}
            checked={checked}
          />
          <Label htmlFor={index}>Rating {index}</Label>
        </React.Fragment>
      )
    })}
  </Root>
)
