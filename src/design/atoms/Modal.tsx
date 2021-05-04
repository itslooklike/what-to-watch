import { styled } from 'linaria/react'

import ClientOnlyPortal from '~/utils/ClientOnlyPortal'

const Backdrop = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const Modal: React.FC = ({ children }) => {
  return (
    <ClientOnlyPortal>
      <Backdrop>{children}</Backdrop>
      <style jsx>{`
        :global(body) {
          overflow: hidden;
        }
      `}</style>
    </ClientOnlyPortal>
  )
}
