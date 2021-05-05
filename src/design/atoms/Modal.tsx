import { styled } from 'linaria/react'

import ClientOnlyPortal from '~/utils/ClientOnlyPortal'

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
`

// FIXME: избавиться от `style jsx`
export const Modal: React.FC = ({ children }) => (
  <ClientOnlyPortal>
    <Backdrop>{children}</Backdrop>
    <style jsx>{`
      :global(body) {
        overflow: hidden;
      }
    `}</style>
  </ClientOnlyPortal>
)
